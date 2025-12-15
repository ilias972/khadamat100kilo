#!/bin/bash

# prisma.service.ts - Ligne 19
sed -i '' '18s/async enableShutdownHooks/enableShutdownHooks/' src/common/prisma.service.ts

# redis-cache.service.ts - Lignes 58, 166
sed -i '' '57s/async getByPattern/getByPattern/' src/common/redis-cache.service.ts
sed -i '' '165s/async getCacheStats/getCacheStats/' src/common/redis-cache.service.ts

# queues.module.ts - Ligne 14
sed -i '' 's/useFactory: async ()/useFactory: ()/' src/modules/queues/queues.module.ts

# dead-letter.processor.ts - Ligne 18
sed -i '' '17s/async process/process/' src/modules/queues/processors/dead-letter.processor.ts

# health.service.ts - Ligne 123
sed -i '' '122s/async getSystemHealth/getSystemHealth/' src/modules/health/health.service.ts

echo "✅ Async sans await corrigés"
