#!/bin/bash

# app.module.ts - Ligne 4
sed -i '' '4s/import { APP_INTERCEPTOR, ConfigService } from/import { APP_INTERCEPTOR } from/' src/app.module.ts

# admin.controller.ts - Ligne 8
sed -i '' '/^import.*Request.*from.*@nestjs\/common/d' src/modules/admin/admin.controller.ts

# locations.controller.ts - Ligne 4
sed -i '' 's/, Roles//' src/modules/locations/locations.controller.ts

# locations.module.ts - Ligne 4
sed -i '' '/import.*PrismaService/d' src/modules/locations/locations.module.ts

# pro/dtos - Ligne 1
sed -i '' 's/IsNumber, //' src/modules/pro/dtos/get-pros-filter.dto.ts

# metrics.service.ts - Ligne 3
sed -i '' '/import.*register/d' src/modules/metrics/metrics.service.ts

# auth.service.ts - Lignes 329-332 - Préfixer avec _
sed -i '' '329s/const passwordHash/const _passwordHash/' src/modules/auth/auth.service.ts
sed -i '' '330s/const emailVerificationToken/const _emailVerificationToken/' src/modules/auth/auth.service.ts
sed -i '' '331s/const passwordResetToken/const _passwordResetToken/' src/modules/auth/auth.service.ts
sed -i '' '332s/const passwordResetExpires/const _passwordResetExpires/' src/modules/auth/auth.service.ts

# health.service.ts - Lignes 27, 115
sed -i '' '27s/const startTime/const _startTime/' src/modules/health/health.service.ts
sed -i '' '115s/) error/) _error/' src/modules/health/health.service.ts

echo "✅ Variables inutilisées corrigées"
