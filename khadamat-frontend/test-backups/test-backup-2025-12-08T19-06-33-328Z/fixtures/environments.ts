export interface EnvironmentConfig {
  baseURL: string;
  apiURL: string;
  name: string;
  isProduction: boolean;
}

export const environments: Record<string, EnvironmentConfig> = {
  local: {
    baseURL: 'http://localhost:3001',
    apiURL: 'http://localhost:3001/api',
    name: 'Local Development',
    isProduction: false
  },
  dev: {
    baseURL: 'https://dev.khadamat.com',
    apiURL: 'https://dev-api.khadamat.com',
    name: 'Development',
    isProduction: false
  },
  staging: {
    baseURL: 'https://staging.khadamat.com',
    apiURL: 'https://staging-api.khadamat.com',
    name: 'Staging',
    isProduction: false
  },
  preview: {
    baseURL: 'https://preview.khadamat.com',
    apiURL: 'https://preview-api.khadamat.com',
    name: 'Preview',
    isProduction: false
  },
  production: {
    baseURL: 'https://khadamat.com',
    apiURL: 'https://api.khadamat.com',
    name: 'Production',
    isProduction: true
  }
};

export function getCurrentEnvironment(): EnvironmentConfig {
  // Determine current environment based on process.env or other factors
  const env = process.env.PLAYWRIGHT_ENV || process.env.NODE_ENV || 'local';

  if (env === 'production') {
    return environments.production;
  } else if (env === 'staging') {
    return environments.staging;
  } else if (env === 'preview') {
    return environments.preview;
  } else if (env === 'dev') {
    return environments.dev;
  } else {
    return environments.local;
  }
}

export function getEnvironmentByName(name: string): EnvironmentConfig {
  return environments[name] || environments.local;
}