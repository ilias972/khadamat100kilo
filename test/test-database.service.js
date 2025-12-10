"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let TestDatabaseService = class TestDatabaseService extends client_1.PrismaClient {
    async onModuleInit() {
        process.env.DATABASE_URL = 'file:./prisma/test.db';
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async cleanDatabase() {
        await this.notification.deleteMany();
        await this.payment.deleteMany();
        await this.proSubscription.deleteMany();
        await this.subscriptionPlan.deleteMany();
        await this.dispute.deleteMany();
        await this.review.deleteMany();
        await this.message.deleteMany();
        await this.conversation.deleteMany();
        await this.booking.deleteMany();
        await this.proService.deleteMany();
        await this.clientProfile.deleteMany();
        await this.proProfile.deleteMany();
        await this.user.deleteMany();
        await this.city.deleteMany();
        await this.serviceCategory.deleteMany();
    }
    async seedTestData() {
        const casablanca = await this.city.create({
            data: {
                name: 'Casablanca',
                region: 'Grand Casablanca',
            },
        });
        const rabat = await this.city.create({
            data: {
                name: 'Rabat',
                region: 'Rabat-Salé-Zemmour-Zaër',
            },
        });
        const menageCategory = await this.serviceCategory.create({
            data: {
                name: 'Ménage',
                description: 'Services de nettoyage',
                icon: '🧹',
            },
        });
        const electriciteCategory = await this.serviceCategory.create({
            data: {
                name: 'Électricité',
                description: 'Services électriques',
                icon: '⚡',
            },
        });
        return {
            cities: { casablanca, rabat },
            categories: { menageCategory, electriciteCategory },
        };
    }
};
exports.TestDatabaseService = TestDatabaseService;
exports.TestDatabaseService = TestDatabaseService = __decorate([
    (0, common_1.Injectable)()
], TestDatabaseService);
//# sourceMappingURL=test-database.service.js.map