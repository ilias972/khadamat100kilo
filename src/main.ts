import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CONFIGURATION CORS COMPLÈTE & ROBUSTE
  // Placée avant le préfixe pour s'assurer qu'elle s'applique à tout.
  app.enableCors({
    origin: 'http://localhost:3000', // L'URL exacte de votre Frontend
    credentials: true,               // Autorise les cookies/sessions
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Liste explicite
    allowedHeaders: [
      'Content-Type',
      'Authorization',  // 🚨 CRUCIAL : C'est souvent lui qui bloquait
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    exposedHeaders: ['Authorization'], // Permet au front de lire le header si besoin
  });

  app.setGlobalPrefix('api');

  // Validation des données entrantes (DTOs)
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(4000);
  console.log('🚀 BACKEND EN LIGNE : http://localhost:4000/api');
}
bootstrap();