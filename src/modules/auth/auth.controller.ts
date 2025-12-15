import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signUpData: any) {
    return this.authService.register(signUpData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: any) {
    console.log('📦 [CONTROLLER] Body reçu :', loginData);

    // ✅ CORRECTION CRITIQUE : On gère les deux cas (email ou emailOrPhone)
    const emailCandidate = loginData.email || loginData.emailOrPhone;
    const password = loginData.password;

    if (!emailCandidate || !password) {
      console.log('❌ [CONTROLLER] Champs manquants');
      throw new UnauthorizedException('Email et mot de passe requis');
    }

    console.log(`✅ [CONTROLLER] Login avec : ${emailCandidate}`);
    return this.authService.login(emailCandidate, password);
  }
}