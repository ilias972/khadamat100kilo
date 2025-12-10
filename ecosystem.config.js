module.exports = {
  apps: [
    {
      name: 'khadamat-backend',
      script: 'dist/main.js',
      instances: 1, // Single instance for development to avoid port conflicts
      exec_mode: 'fork', // Fork mode for development
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        DATABASE_URL: 'postgresql://admin:password123@localhost:5432/khadamat_db?schema=public',
        JWT_SECRET: 'your_secure_jwt_secret_key_here_change_in_production',
        JWT_REFRESH_SECRET: 'your_secure_jwt_refresh_secret_key_here_change_in_production',
        REDIS_URL: 'redis://localhost:6379',
        EMAIL_HOST: 'smtp.example.com',
        EMAIL_PORT: 587,
        EMAIL_USER: 'your_email@example.com',
        EMAIL_PASS: 'your_email_password',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Auto restart configuration
      autorestart: true,
      watch: false, // Don't watch files in production
      max_memory_restart: '1G', // Restart if memory exceeds 1GB
      restart_delay: 4000, // Delay between restarts
      // Logging
      log_file: '/var/log/pm2/khadamat-backend.log',
      out_file: '/var/log/pm2/khadamat-backend-out.log',
      error_file: '/var/log/pm2/khadamat-backend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Process management
      min_uptime: '10s', // Minimum uptime before considering restart successful
      max_restarts: 10, // Maximum number of restart attempts
      // Environment variables with proper defaults
      env: {
        DATABASE_URL: process.env.DATABASE_URL || 'postgresql://admin:password123@localhost:5432/khadamat_db?schema=public',
        JWT_SECRET: process.env.JWT_SECRET || 'your_secure_jwt_secret_key_here_change_in_production',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your_secure_jwt_refresh_secret_key_here_change_in_production',
        REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
        EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.example.com',
        EMAIL_PORT: process.env.EMAIL_PORT || 587,
        EMAIL_USER: process.env.EMAIL_USER || 'your_email@example.com',
        EMAIL_PASS: process.env.EMAIL_PASS || 'your_email_password',
      },
    },
    {
      name: 'khadamat-frontend',
      script: 'npm',
      args: 'start',
      cwd: './khadamat-frontend',
      instances: 1, // Single instance for frontend
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      // Auto restart
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      restart_delay: 4000,
      // Logging
      log_file: '/var/log/pm2/khadamat-frontend.log',
      out_file: '/var/log/pm2/khadamat-frontend-out.log',
      error_file: '/var/log/pm2/khadamat-frontend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Process management
      min_uptime: '10s',
      max_restarts: 5,
    },
  ],
  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy', // Replace with your deploy user
      host: 'your-server-ip', // Replace with your server IP
      ref: 'origin/main',
      repo: 'https://github.com/your-username/khadamat.git', // Replace with your repo
      path: '/home/deploy/khadamat-production',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};