#!/bin/bash

echo "Correction des controllers..."

# Liste des fichiers à corriger
FILES=(
  "src/modules/messaging/messaging.controller.ts"
  "src/modules/notifications/notifications.controller.ts"
  "src/modules/reviews/reviews.controller.ts"
  "src/modules/statistics/statistics.controller.ts"
)

for file in "${FILES[@]}"; do
  echo "Traitement de $file..."
  
  # Ajouter import Request si absent
  if ! grep -q "import { Request } from 'express'" "$file"; then
    # Trouver la ligne des imports @nestjs/common
    sed -i '' "/import.*from '@nestjs\/common'/a\\
import { Request } from 'express';
" "$file"
  fi
  
  # Remplacer @Request() req par @Request() req: Request
  sed -i '' 's/@Request() req\([,)]\)/@Request() req: Request\1/g' "$file"
  
  # Remplacer req.user.sub par req.user!.id
  sed -i '' 's/req\.user\.sub/req.user!.id/g' "$file"
  sed -i '' 's/req\.user\.id/req.user!.id/g' "$file"
done

echo "✅ Controllers typés"
