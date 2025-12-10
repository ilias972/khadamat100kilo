import { test, expect } from '@playwright/test';
import { TestDataFactory } from '../fixtures/test-data';

test.describe('API Contract Tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // 3 minutes per test
  });

  test('Auth API contract - Login endpoint', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: {
        email: 'fresh-test-user@test.com',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('refreshToken');
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user).toHaveProperty('id');
    expect(responseBody.user).toHaveProperty('email');
    expect(responseBody.user).toHaveProperty('role');
  });

  test('Auth API contract - Signup endpoint @api', async ({ request }) => {
    const testUser = TestDataFactory.generateTestUser('client');
    const response = await request.post('/api/auth/signup', {
      data: {
        email: testUser.email,
        password: testUser.password,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        phone: testUser.phone,
        role: testUser.role
      }
    });

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('refreshToken');
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user.email).toBe(testUser.email);
  });

  test('Services API contract - Get services @api', async ({ request }) => {
    const response = await request.get('/api/services');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);

    if (responseBody.length > 0) {
      const firstService = responseBody[0];
      expect(firstService).toHaveProperty('id');
      expect(firstService).toHaveProperty('name');
      expect(firstService).toHaveProperty('description');
      expect(firstService).toHaveProperty('price');
      expect(firstService).toHaveProperty('category');
      expect(firstService).toHaveProperty('providerId');
    }
  });

  test('Bookings API contract - Create booking @api', async ({ request }) => {
    // First, authenticate to get a token
    const authResponse = await request.post('/api/auth/login', {
      data: {
        email: 'fresh-test-user@test.com',
        password: 'password123'
      }
    });

    const authData = await authResponse.json();
    const accessToken = authData.accessToken;

    // Now create a booking with the token
    const bookingData = TestDataFactory.generateTestBooking();
    const response = await request.post('/api/bookings', {
      data: {
        serviceId: bookingData.serviceId,
        date: bookingData.date,
        time: bookingData.time,
        address: bookingData.address,
        notes: bookingData.notes
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('serviceId');
    expect(responseBody).toHaveProperty('clientId');
    expect(responseBody).toHaveProperty('status');
    expect(responseBody).toHaveProperty('date');
    expect(responseBody).toHaveProperty('time');
    expect(responseBody).toHaveProperty('address');
  });

  test('Profile API contract - Get user profile @api', async ({ request }) => {
    // First, authenticate to get a token
    const authResponse = await request.post('/api/auth/login', {
      data: {
        email: 'fresh-test-user@test.com',
        password: 'password123'
      }
    });

    const authData = await authResponse.json();
    const accessToken = authData.accessToken;

    // Now get the profile
    const response = await request.get('/api/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('email');
    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('lastName');
    expect(responseBody).toHaveProperty('phone');
    expect(responseBody).toHaveProperty('role');
  });

  test('Messaging API contract - Send message @api', async ({ request }) => {
    // First, authenticate to get a token
    const authResponse = await request.post('/api/auth/login', {
      data: {
        email: 'fresh-test-user@test.com',
        password: 'password123'
      }
    });

    const authData = await authResponse.json();
    const accessToken = authData.accessToken;

    // Get first service to create a booking
    const servicesResponse = await request.get('/api/services');
    const services = await servicesResponse.json();
    const firstService = services[0];

    // Create a booking
    const bookingResponse = await request.post('/api/bookings', {
      data: {
        serviceId: firstService.id,
        date: '2023-12-15',
        time: '10:00',
        address: 'Test Address'
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const bookingData = await bookingResponse.json();

    // Now send a message related to the booking
    const messageData = TestDataFactory.generateTestMessage();
    const response = await request.post('/api/messages', {
      data: {
        bookingId: bookingData.id,
        content: messageData.content
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('bookingId');
    expect(responseBody).toHaveProperty('senderId');
    expect(responseBody).toHaveProperty('content');
    expect(responseBody).toHaveProperty('timestamp');
  });
});