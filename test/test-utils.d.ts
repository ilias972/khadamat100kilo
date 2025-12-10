import { INestApplication } from '@nestjs/common';
import { TestDatabaseService } from './test-database.service';
import request from 'supertest';
import { SignupDto } from '../src/modules/auth/dtos/signup.dto';
export declare class TestUtils {
    private app;
    private db;
    constructor(app: INestApplication, db: TestDatabaseService);
    createTestUser(userData?: Partial<SignupDto>): Promise<{
        user: any;
        credentials: {
            email: string;
            password: string;
        };
    }>;
    createTestClient(clientData?: Partial<SignupDto>): Promise<{
        user: any;
        credentials: {
            email: string;
            password: string;
        };
    }>;
    createTestPro(proData?: Partial<SignupDto>): Promise<{
        user: any;
        credentials: {
            email: string;
            password: string;
        };
    }>;
    loginUser(credentials: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: any;
        refreshToken: any;
        user: any;
    }>;
    getAuthHeaders(accessToken: string): Promise<{
        Authorization: string;
    }>;
    verifyEmail(token: string): Promise<any>;
    createAuthenticatedRequest(accessToken: string): import("supertest/lib/agent")<request.SuperTestStatic.Test>;
    createTestBooking(clientToken: string, bookingData: any): Promise<any>;
    createTestProService(proToken: string, serviceData: any): Promise<{
        id: string;
        isActive: boolean;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        cityId: string;
        serviceCategoryId: string;
        proProfileId: string;
        basePrice: number;
        minPrice: number | null;
        maxPrice: number | null;
    }>;
}
