import { ConfigService } from '@nestjs/config';

export function getEnvironmentConfig(configService: ConfigService) {
  const nodeEnv = configService.get<string>('app.nodeEnv') || 'development';

  return {
    isDevelopment: nodeEnv === 'development',
    isProduction: nodeEnv === 'production',
    isTest: nodeEnv === 'test',
    nodeEnv,
  };
}

export function getDatabaseConfig(configService: ConfigService) {
  const nodeEnv = configService.get<string>('app.nodeEnv') || 'development';

  // Use different databases for different environments
  if (nodeEnv === 'test') {
    return {
      url: configService.get<string>('database.url') || 'file:./prisma/test.db',
      logging: false,
    };
  }

  return {
    url:
      configService.get<string>('database.url') ||
      'postgresql://admin:password123@localhost:5432/khadamat_db?schema=public',
    logging: nodeEnv === 'development',
  };
}

export function getPortConfig(configService: ConfigService) {
  const nodeEnv = configService.get<string>('app.nodeEnv') || 'development';

  // Use different ports for different environments to avoid conflicts
  if (nodeEnv === 'test') {
    return 3002; // Test port
  }
  if (nodeEnv === 'development') {
    return configService.get<number>('app.port') || 3000;
  }
  return configService.get<number>('app.port') || 3000; // Production
}

export function validateEnvironment(configService: ConfigService): void {
  const requiredVars = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];

  const missingVars = requiredVars.filter(
    (varName) => !configService.get(varName),
  );

  if (missingVars.length > 0) {
    console.warn(
      `⚠️  Missing required environment variables: ${missingVars.join(', ')}`,
    );
    if (configService.get<string>('app.nodeEnv') !== 'test') {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`,
      );
    }
  }
}
