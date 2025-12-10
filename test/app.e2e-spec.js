"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const supertest_1 = __importDefault(require("supertest"));
const test_database_service_1 = require("./test-database.service");
const test_utils_1 = require("./test-utils");
const auth_module_1 = require("../src/modules/auth/auth.module");
const users_module_1 = require("../src/modules/users/users.module");
const bookings_module_1 = require("../src/modules/bookings/bookings.module");
const health_module_1 = require("../src/modules/health/health.module");
const config_1 = require("@nestjs/config");
describe('Khadamat API (e2e)', () => {
    let app;
    let testDb;
    let testUtils;
    let testData;
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        process.env.DATABASE_URL = 'file:./prisma/test.db';
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env',
                }),
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                bookings_module_1.BookingsModule,
                health_module_1.HealthModule,
            ],
        }).overrideProvider('PrismaService')
            .useClass(test_database_service_1.TestDatabaseService)
            .compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
        testDb = moduleFixture.get('PrismaService');
        testUtils = new test_utils_1.TestUtils(app, testDb);
        await app.init();
        await testDb.cleanDatabase();
        testData = await testDb.seedTestData();
    });
    afterAll(async () => {
        await testDb.$disconnect();
        await app.close();
    });
    afterEach(async () => {
        await testDb.cleanDatabase();
        testData = await testDb.seedTestData();
    });
    describe('Health Check', () => {
        it('/health (GET) - should return health status', () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .get('/health')
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('status', 'ok');
            });
        });
    });
    describe('User Registration', () => {
        describe('Client Registration', () => {
            it('should register a new client successfully', async () => {
                const clientData = {
                    email: 'client@example.com',
                    phone: '+212600000001',
                    password: 'password123',
                    role: 'client',
                    firstName: 'John',
                    lastName: 'Doe',
                };
                const response = await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/signup')
                    .send(clientData)
                    .expect(201);
                expect(response.body).toHaveProperty('id');
                expect(response.body).toHaveProperty('email', clientData.email);
                expect(response.body).toHaveProperty('roles');
                expect(JSON.parse(response.body.roles)).toContain('client');
                expect(response.body).toHaveProperty('isEmailVerified', false);
            });
            it('should fail registration with invalid email', async () => {
                const invalidData = {
                    email: 'invalid-email',
                    phone: '+212600000002',
                    password: 'password123',
                    role: 'client',
                    firstName: 'John',
                    lastName: 'Doe',
                };
                await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/signup')
                    .send(invalidData)
                    .expect(400);
            });
            it('should fail registration with duplicate email', async () => {
                const clientData = {
                    email: 'duplicate@example.com',
                    phone: '+212600000003',
                    password: 'password123',
                    role: 'client',
                    firstName: 'John',
                    lastName: 'Doe',
                };
                await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/signup')
                    .send(clientData)
                    .expect(201);
                await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/signup')
                    .send(clientData)
                    .expect(409);
            });
        });
        describe('Pro Registration', () => {
            it('should register a new pro successfully', async () => {
                const proData = {
                    email: 'pro@example.com',
                    phone: '+212600000004',
                    password: 'password123',
                    role: 'pro',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    profession: 'Plumber',
                    bio: 'Professional plumber with 5 years experience',
                };
                const response = await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/signup')
                    .send(proData)
                    .expect(201);
                expect(response.body).toHaveProperty('id');
                expect(response.body).toHaveProperty('email', proData.email);
                expect(response.body).toHaveProperty('roles');
                expect(JSON.parse(response.body.roles)).toContain('pro');
                expect(response.body).toHaveProperty('isEmailVerified', false);
            });
            it('should register pro without optional bio', async () => {
                const proData = {
                    email: 'pro2@example.com',
                    phone: '+212600000005',
                    password: 'password123',
                    role: 'pro',
                    firstName: 'Bob',
                    lastName: 'Johnson',
                    profession: 'Electrician',
                };
                const response = await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/signup')
                    .send(proData)
                    .expect(201);
                expect(response.body).toHaveProperty('id');
                expect(JSON.parse(response.body.roles)).toContain('pro');
            });
        });
    });
    describe('Authentication', () => {
        let testClient;
        let testPro;
        beforeEach(async () => {
            testClient = await testUtils.createTestClient();
            testPro = await testUtils.createTestPro();
        });
        describe('Login', () => {
            it('should login client successfully', async () => {
                const loginData = {
                    emailOrPhone: testClient.credentials.email,
                    password: testClient.credentials.password,
                };
                const response = await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/login')
                    .send(loginData)
                    .expect(200);
                expect(response.body).toHaveProperty('accessToken');
                expect(response.body).toHaveProperty('refreshToken');
                expect(response.body).toHaveProperty('user');
                expect(response.body.user.email).toBe(testClient.credentials.email);
            });
            it('should login pro successfully', async () => {
                const loginData = {
                    emailOrPhone: testPro.credentials.email,
                    password: testPro.credentials.password,
                };
                const response = await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/login')
                    .send(loginData)
                    .expect(200);
                expect(response.body).toHaveProperty('accessToken');
                expect(response.body).toHaveProperty('refreshToken');
                expect(response.body.user.email).toBe(testPro.credentials.email);
            });
            it('should fail login with wrong password', async () => {
                const loginData = {
                    emailOrPhone: testClient.credentials.email,
                    password: 'wrongpassword',
                };
                await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/login')
                    .send(loginData)
                    .expect(401);
            });
            it('should fail login with non-existent user', async () => {
                const loginData = {
                    emailOrPhone: 'nonexistent@example.com',
                    password: 'password123',
                };
                await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/login')
                    .send(loginData)
                    .expect(401);
            });
        });
        describe('Token Refresh', () => {
            it('should refresh access token', async () => {
                const loginResponse = await testUtils.loginUser(testClient.credentials);
                const refreshData = {
                    refreshToken: loginResponse.refreshToken,
                };
                const response = await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/refresh')
                    .send(refreshData)
                    .expect(200);
                expect(response.body).toHaveProperty('accessToken');
                expect(response.body).toHaveProperty('refreshToken');
            });
            it('should fail refresh with invalid token', async () => {
                const refreshData = {
                    refreshToken: 'invalid-token',
                };
                await (0, supertest_1.default)(app.getHttpServer())
                    .post('/auth/refresh')
                    .send(refreshData)
                    .expect(401);
            });
        });
    });
    describe('Email Verification', () => {
        let testUser;
        beforeEach(async () => {
            testUser = await testUtils.createTestUser();
        });
        it('should verify email with valid token', async () => {
            const user = await testDb.user.findUnique({
                where: { email: testUser.credentials.email },
            });
            expect(user).not.toBeNull();
            expect(user.emailVerificationToken).not.toBeNull();
            const verifyData = {
                token: user.emailVerificationToken,
            };
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/verify-email')
                .send(verifyData)
                .expect(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('verified');
            const updatedUser = await testDb.user.findUnique({
                where: { email: testUser.credentials.email },
            });
            expect(updatedUser).not.toBeNull();
            expect(updatedUser.isEmailVerified).toBe(true);
        });
        it('should fail verification with invalid token', async () => {
            const verifyData = {
                token: 'invalid-token',
            };
            await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/verify-email')
                .send(verifyData)
                .expect(400);
        });
        it('should resend verification email', async () => {
            const resendData = {
                email: testUser.credentials.email,
            };
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/resend-verification')
                .send(resendData)
                .expect(200);
            expect(response.body).toHaveProperty('message');
        });
    });
    describe('Role-Based Access Control', () => {
        let clientToken;
        let proToken;
        let testClient;
        let testPro;
        beforeEach(async () => {
            testClient = await testUtils.createTestClient();
            testPro = await testUtils.createTestPro();
            const clientLogin = await testUtils.loginUser(testClient.credentials);
            const proLogin = await testUtils.loginUser(testPro.credentials);
            clientToken = clientLogin.accessToken;
            proToken = proLogin.accessToken;
        });
        describe('User Profile Access', () => {
            it('should allow client to access their own profile', async () => {
                const response = await testUtils.createAuthenticatedRequest(clientToken)
                    .get('/user/profile')
                    .expect(200);
                expect(response.body).toHaveProperty('email', testClient.credentials.email);
            });
            it('should allow pro to access their own profile', async () => {
                const response = await testUtils.createAuthenticatedRequest(proToken)
                    .get('/user/profile')
                    .expect(200);
                expect(response.body).toHaveProperty('email', testPro.credentials.email);
            });
            it('should fail access without authentication', async () => {
                await (0, supertest_1.default)(app.getHttpServer())
                    .get('/user/profile')
                    .expect(401);
            });
        });
        describe('Booking Access Control', () => {
            it('should allow client to create booking', async () => {
                const bookingData = {
                    proId: testPro.user.id,
                    serviceCategoryId: testData.categories.menageCategory.id,
                    cityId: testData.cities.casablanca.id,
                    description: 'Need house cleaning service',
                };
                const response = await testUtils.createAuthenticatedRequest(clientToken)
                    .post('/bookings')
                    .send(bookingData)
                    .expect(201);
                expect(response.body).toHaveProperty('id');
                expect(response.body).toHaveProperty('clientId', testClient.user.id);
                expect(response.body).toHaveProperty('proId', testPro.user.id);
            });
            it('should allow pro to view their bookings', async () => {
                const bookingData = {
                    proId: testPro.user.id,
                    serviceCategoryId: testData.categories.menageCategory.id,
                    cityId: testData.cities.casablanca.id,
                    description: 'Need house cleaning service',
                };
                await testUtils.createAuthenticatedRequest(clientToken)
                    .post('/bookings')
                    .send(bookingData)
                    .expect(201);
                const response = await testUtils.createAuthenticatedRequest(proToken)
                    .get('/bookings')
                    .expect(200);
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBeGreaterThan(0);
            });
            it('should allow pro to update booking status', async () => {
                const bookingData = {
                    proId: testPro.user.id,
                    serviceCategoryId: testData.categories.menageCategory.id,
                    cityId: testData.cities.casablanca.id,
                    description: 'Need house cleaning service',
                };
                const bookingResponse = await testUtils.createAuthenticatedRequest(clientToken)
                    .post('/bookings')
                    .send(bookingData)
                    .expect(201);
                const bookingId = bookingResponse.body.id;
                const updateData = {
                    status: 'accepted',
                };
                const response = await testUtils.createAuthenticatedRequest(proToken)
                    .put(`/bookings/${bookingId}/status`)
                    .send(updateData)
                    .expect(200);
                expect(response.body).toHaveProperty('status', 'accepted');
            });
        });
    });
    describe('Booking Management', () => {
        let clientToken;
        let proToken;
        let testClient;
        let testPro;
        let bookingId;
        beforeEach(async () => {
            testClient = await testUtils.createTestClient();
            testPro = await testUtils.createTestPro();
            const clientLogin = await testUtils.loginUser(testClient.credentials);
            const proLogin = await testUtils.loginUser(testPro.credentials);
            clientToken = clientLogin.accessToken;
            proToken = proLogin.accessToken;
            const bookingData = {
                proId: testPro.user.id,
                serviceCategoryId: testData.categories.menageCategory.id,
                cityId: testData.cities.casablanca.id,
                description: 'Need house cleaning service',
            };
            const bookingResponse = await testUtils.createAuthenticatedRequest(clientToken)
                .post('/bookings')
                .send(bookingData)
                .expect(201);
            bookingId = bookingResponse.body.id;
        });
        it('should get user bookings', async () => {
            const response = await testUtils.createAuthenticatedRequest(clientToken)
                .get('/bookings')
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id', bookingId);
        });
        it('should get specific booking details', async () => {
            const response = await testUtils.createAuthenticatedRequest(clientToken)
                .get(`/bookings/${bookingId}`)
                .expect(200);
            expect(response.body).toHaveProperty('id', bookingId);
            expect(response.body).toHaveProperty('description', 'Need house cleaning service');
        });
        it('should update booking status through workflow', async () => {
            await testUtils.createAuthenticatedRequest(proToken)
                .put(`/bookings/${bookingId}/status`)
                .send({ status: 'accepted' })
                .expect(200);
            let booking = await testUtils.createAuthenticatedRequest(clientToken)
                .get(`/bookings/${bookingId}`)
                .expect(200);
            expect(booking.body.status).toBe('accepted');
            await testUtils.createAuthenticatedRequest(proToken)
                .put(`/bookings/${bookingId}/status`)
                .send({ status: 'completed' })
                .expect(200);
            booking = await testUtils.createAuthenticatedRequest(clientToken)
                .get(`/bookings/${bookingId}`)
                .expect(200);
            expect(booking.body.status).toBe('completed');
        });
        it('should fail to access booking from different user', async () => {
            const otherClient = await testUtils.createTestClient();
            const otherLogin = await testUtils.loginUser(otherClient.credentials);
            const otherToken = otherLogin.accessToken;
            await testUtils.createAuthenticatedRequest(otherToken)
                .get(`/bookings/${bookingId}`)
                .expect(403);
        });
    });
    describe('Error Handling', () => {
        it('should handle validation errors', async () => {
            const invalidData = {
                email: 'invalid-email',
                phone: 'invalid-phone',
                password: '123',
                role: 'invalid-role',
            };
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/signup')
                .send(invalidData)
                .expect(400);
            expect(response.body).toHaveProperty('message');
            expect(Array.isArray(response.body.message)).toBe(true);
        });
        it('should handle 404 for non-existent routes', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .get('/non-existent-route')
                .expect(404);
        });
        it('should handle malformed JSON', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/signup')
                .set('Content-Type', 'application/json')
                .send('{invalid json}')
                .expect(400);
        });
    });
    describe('Integration Tests', () => {
        let clientToken;
        let proToken;
        let testClient;
        let testPro;
        beforeEach(async () => {
            testClient = await testUtils.createTestClient();
            testPro = await testUtils.createTestPro();
            const clientLogin = await testUtils.loginUser(testClient.credentials);
            const proLogin = await testUtils.loginUser(testPro.credentials);
            clientToken = clientLogin.accessToken;
            proToken = proLogin.accessToken;
        });
        it('should complete full booking workflow', async () => {
            const bookingData = {
                proId: testPro.user.id,
                serviceCategoryId: testData.categories.menageCategory.id,
                cityId: testData.cities.casablanca.id,
                description: 'Need house cleaning service',
                scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                timeSlot: '10:00-12:00',
            };
            const bookingResponse = await testUtils.createAuthenticatedRequest(clientToken)
                .post('/bookings')
                .send(bookingData)
                .expect(201);
            const bookingId = bookingResponse.body.id;
            expect(bookingResponse.body.status).toBe('requested');
            await testUtils.createAuthenticatedRequest(proToken)
                .put(`/bookings/${bookingId}/status`)
                .send({ status: 'accepted' })
                .expect(200);
            await testUtils.createAuthenticatedRequest(proToken)
                .put(`/bookings/${bookingId}/status`)
                .send({ status: 'completed' })
                .expect(200);
            const finalBooking = await testUtils.createAuthenticatedRequest(clientToken)
                .get(`/bookings/${bookingId}`)
                .expect(200);
            expect(finalBooking.body.status).toBe('completed');
            expect(finalBooking.body).toHaveProperty('scheduledDate');
            expect(finalBooking.body).toHaveProperty('timeSlot');
        });
        it('should handle booking rejection workflow', async () => {
            const bookingData = {
                proId: testPro.user.id,
                serviceCategoryId: testData.categories.menageCategory.id,
                cityId: testData.cities.casablanca.id,
                description: 'Need house cleaning service',
            };
            const bookingResponse = await testUtils.createAuthenticatedRequest(clientToken)
                .post('/bookings')
                .send(bookingData)
                .expect(201);
            const bookingId = bookingResponse.body.id;
            await testUtils.createAuthenticatedRequest(proToken)
                .put(`/bookings/${bookingId}/status`)
                .send({ status: 'rejected' })
                .expect(200);
            const finalBooking = await testUtils.createAuthenticatedRequest(clientToken)
                .get(`/bookings/${bookingId}`)
                .expect(200);
            expect(finalBooking.body.status).toBe('rejected');
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map