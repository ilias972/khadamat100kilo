#!/bin/bash

echo "Correction des types 'any'..."

# auth.controller.ts - Cache methods
sed -i '' '60s/fn: () => Promise<any>/fn: () => Promise<unknown>/' src/modules/auth/auth.controller.ts

# notifications.service.ts - Ligne 9
sed -i '' '9s/Record<string, any>/Record<string, unknown>/' src/modules/notifications/notifications.service.ts

# reviews.service.ts - Ligne 90
sed -i '' '90s/: any/: unknown/' src/modules/reviews/reviews.service.ts

# processors - Job types
sed -i '' 's/Job<any>/Job<unknown>/g' src/modules/queues/processors/*.ts

# filters - Exception types
sed -i '' 's/exception: any/exception: unknown/g' src/common/filters/http-exception.filter.ts
sed -i '' 's/details: any/details: unknown/g' src/common/filters/http-exception.filter.ts

# business-logger.service.ts - metadata
sed -i '' 's/metadata\?: any/metadata?: Record<string, unknown>/g' src/common/logger/business-logger.service.ts

# redis-cache.service.ts - value types
sed -i '' 's/value: any/value: unknown/g' src/common/redis-cache.service.ts

echo "✅ Types 'any' remplacés"
