#!/bin/bash

# Khadamat Production Deployment Script
# This script handles the complete deployment process for the Khadamat application

set -e  # Exit on any error

# Configuration
APP_NAME="khadamat"
APP_DIR="/home/deploy/$APP_NAME-production"
BACKUP_DIR="/home/deploy/backups"
LOG_FILE="/var/log/deploy-$APP_NAME.log"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}" | tee -a "$LOG_FILE"
}

# Check if running as deploy user
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root. Run as deploy user."
fi

log "Starting deployment of $APP_NAME..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup current database (if using local PostgreSQL)
log "Creating database backup..."
pg_dump "$DATABASE_URL" > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql" 2>/dev/null || warning "Database backup failed - check DATABASE_URL"

# Navigate to app directory
cd "$APP_DIR" || error "Cannot change to app directory: $APP_DIR"

# Pull latest changes
log "Pulling latest code from repository..."
git pull origin main || error "Git pull failed"

# Install backend dependencies
log "Installing backend dependencies..."
npm ci --only=production || error "Backend dependency installation failed"

# Build backend
log "Building backend..."
npm run build || error "Backend build failed"

# Install frontend dependencies
log "Installing frontend dependencies..."
cd khadamat-frontend
npm ci --only=production || error "Frontend dependency installation failed"

# Build frontend
log "Building frontend..."
npm run build || error "Frontend build failed"

# Return to root
cd ..

# Run database migrations
log "Running database migrations..."
npx prisma migrate deploy || error "Database migration failed"

# Reload PM2 processes
log "Reloading PM2 processes..."
pm2 reload ecosystem.config.js --env production || error "PM2 reload failed"

# Wait for services to start
log "Waiting for services to start..."
sleep 10

# Health check
log "Performing health checks..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    log "Backend health check passed"
else
    error "Backend health check failed"
fi

if curl -f http://localhost:3001 > /dev/null 2>&1; then
    log "Frontend health check passed"
else
    error "Frontend health check failed"
fi

# Clean up old backups (keep last 7 days)
log "Cleaning up old backups..."
find "$BACKUP_DIR" -name "db_backup_*.sql" -mtime +7 -delete

# Send notification (optional - requires mail command)
# echo "Deployment completed successfully at $(date)" | mail -s "$APP_NAME Deployment Success" admin@yourdomain.com

log "Deployment completed successfully!"

# Show PM2 status
pm2 list