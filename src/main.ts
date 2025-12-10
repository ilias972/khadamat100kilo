import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { createBrotliCompress, createGzip } from 'zlib';
import { pipeline } from 'stream';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

async function bootstrap() {
  // Initialize Sentry
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      Sentry.httpIntegration(),
      Sentry.nativeNodeFetchIntegration(),
      Sentry.graphqlIntegration(),
      Sentry.mongoIntegration(),
      Sentry.postgresIntegration(),
      Sentry.redisIntegration(),
      nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
    // Release tracking
    release: process.env.npm_package_version,
    // Error tracking
    beforeSend(event) {
      // Add custom context
      event.tags = {
        ...event.tags,
        service: 'khadamat-backend',
        version: process.env.npm_package_version,
      };
      return event;
    },
  });

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Security: Enable Helmet for HTTP security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "cdn.jsdelivr.net"],
        connectSrc: ["'self'", "http://localhost:3000"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
      },
    },
    frameguard: { action: 'deny' },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    xssFilter: true,
    noSniff: true,
  }));

  // Security: Configure secure cookies
  app.use(cookieParser());

  // Security: Enable CORS with specific allowed origins
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://khadamat-frontend.vercel.app',
      'https://*.khadamat.com'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400,
  });

  // Security: Set additional security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
  });

  // Configure Swagger documentation on /api/docs with title 'Khadamat API' version '1.0'
  const config = new DocumentBuilder()
    .setTitle('Khadamat API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Response Compression Middleware
  function compressionMiddleware(req, res, next) {
    const acceptEncoding = req.headers['accept-encoding'] || '';

    // Check if client supports compression
    if (acceptEncoding.includes('br')) {
      res.setHeader('Content-Encoding', 'br');
      const brotli = createBrotliCompress();
      const originalSend = res.send;

      res.send = function(data) {
        if (typeof data === 'string' || Buffer.isBuffer(data)) {
          brotli.write(data);
          brotli.end();
          pipeline(brotli, res, () => {});
        } else {
          originalSend.call(this, data);
        }
      };
    } else if (acceptEncoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip');
      const gzip = createGzip();
      const originalSend = res.send;

      res.send = function(data) {
        if (typeof data === 'string' || Buffer.isBuffer(data)) {
          gzip.write(data);
          gzip.end();
          pipeline(gzip, res, () => {});
        } else {
          originalSend.call(this, data);
        }
      };
    }

    next();
  }

  // Apply compression middleware
  app.use(compressionMiddleware);

  // Ensure ValidationPipe is enabled globally with transform: true and whitelist: true
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }));

  // Get port from environment with fallback
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`[Nest] Application successfully started on port ${port} with enhanced security`);
}

bootstrap();
