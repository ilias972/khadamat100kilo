import { INestApplication } from '@nestjs/common';
import { TestDatabaseService } from './test-database.service';
import request from 'supertest';
import { SignupDto } from '../src/modules/auth/dtos/signup.dto';
import { LoginDto } from '../src/modules/auth/dtos/login.dto';

export class TestUtils {
  constructor(
    private app: INestApplication,
    private db: TestDatabaseService,
  ) {}

  async createTestUser(userData: Partial<SignupDto> = {}) {
    const defaultUser: SignupDto = {
      email: `test${Date.now()}@example.com`,
      phone: '+212600000000',
      password: 'password123',
      role: 'CLIENT',
      firstName: 'Test',
      lastName: 'User',
      ...userData,
    };

    const response = await request(this.app.getHttpServer())
      .post('/auth/signup')
      .send(defaultUser)
      .expect(201);

    return {
      user: response.body,
      credentials: {
        email: defaultUser.email,
        password: defaultUser.password,
      },
    };
  }

  async createTestClient(clientData: Partial<SignupDto> = {}) {
    return this.createTestUser({
      role: 'CLIENT',
      firstName: 'Test',
      lastName: 'Client',
      ...clientData,
    });
  }

  async createTestPro(proData: Partial<SignupDto> = {}) {
    return this.createTestUser({
      role: 'PRO',
      firstName: 'Test',
      lastName: 'Pro',
      profession: 'Plumber',
      bio: 'Professional plumber with 5 years experience',
      ...proData,
    });
  }

  async loginUser(credentials: { email: string; password: string }) {
    const loginDto: LoginDto = {
      emailOrPhone: credentials.email,
      password: credentials.password,
    };

    const response = await request(this.app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    return {
      accessToken: response.body.accessToken,
      refreshToken: response.body.refreshToken,
      user: response.body.user,
    };
  }

  async getAuthHeaders(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async verifyEmail(token: string) {
    const response = await request(this.app.getHttpServer())
      .post('/auth/verify-email')
      .send({ token })
      .expect(200);

    return response.body;
  }

  createAuthenticatedRequest(accessToken: string) {
    return request(this.app.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`);
  }

  async createTestBooking(clientToken: string, bookingData: any) {
    const response = await this.createAuthenticatedRequest(clientToken)
      .post('/bookings')
      .send(bookingData)
      .expect(201);

    return response.body;
  }

  async createTestProService(proToken: string, serviceData: any) {
    // This would need to be implemented based on the pro service endpoints
    // For now, we'll create it directly in the database for testing
    const proUser = await this.db.user.findFirst({
      where: { email: 'testpro@example.com' }, // We'll need to adjust this
    });

    if (!proUser) {
      throw new Error('Pro user not found for service creation');
    }

    const service = await this.db.proService.create({
      data: {
        proProfileId: proUser.id,
        serviceCategoryId: serviceData.serviceCategoryId,
        cityId: serviceData.cityId,
        basePrice: serviceData.basePrice || 100,
        description: serviceData.description || 'Test service',
      },
    });

    return service;
  }
}