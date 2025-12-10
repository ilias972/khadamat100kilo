"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUtils = void 0;
const supertest_1 = __importDefault(require("supertest"));
class TestUtils {
    app;
    db;
    constructor(app, db) {
        this.app = app;
        this.db = db;
    }
    async createTestUser(userData = {}) {
        const defaultUser = {
            email: `test${Date.now()}@example.com`,
            phone: '+212600000000',
            password: 'password123',
            role: 'CLIENT',
            firstName: 'Test',
            lastName: 'User',
            ...userData,
        };
        const response = await (0, supertest_1.default)(this.app.getHttpServer())
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
    async createTestClient(clientData = {}) {
        return this.createTestUser({
            role: 'CLIENT',
            firstName: 'Test',
            lastName: 'Client',
            ...clientData,
        });
    }
    async createTestPro(proData = {}) {
        return this.createTestUser({
            role: 'PRO',
            firstName: 'Test',
            lastName: 'Pro',
            profession: 'Plumber',
            bio: 'Professional plumber with 5 years experience',
            ...proData,
        });
    }
    async loginUser(credentials) {
        const loginDto = {
            emailOrPhone: credentials.email,
            password: credentials.password,
        };
        const response = await (0, supertest_1.default)(this.app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200);
        return {
            accessToken: response.body.accessToken,
            refreshToken: response.body.refreshToken,
            user: response.body.user,
        };
    }
    async getAuthHeaders(accessToken) {
        return {
            Authorization: `Bearer ${accessToken}`,
        };
    }
    async verifyEmail(token) {
        const response = await (0, supertest_1.default)(this.app.getHttpServer())
            .post('/auth/verify-email')
            .send({ token })
            .expect(200);
        return response.body;
    }
    createAuthenticatedRequest(accessToken) {
        return (0, supertest_1.default)(this.app.getHttpServer())
            .set('Authorization', `Bearer ${accessToken}`);
    }
    async createTestBooking(clientToken, bookingData) {
        const response = await this.createAuthenticatedRequest(clientToken)
            .post('/bookings')
            .send(bookingData)
            .expect(201);
        return response.body;
    }
    async createTestProService(proToken, serviceData) {
        const proUser = await this.db.user.findFirst({
            where: { email: 'testpro@example.com' },
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
exports.TestUtils = TestUtils;
//# sourceMappingURL=test-utils.js.map