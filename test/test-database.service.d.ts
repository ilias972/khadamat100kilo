import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class TestDatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    cleanDatabase(): Promise<void>;
    seedTestData(): Promise<{
        cities: {
            casablanca: {
                name: string;
                id: string;
                region: string | null;
                isActive: boolean;
            };
            rabat: {
                name: string;
                id: string;
                region: string | null;
                isActive: boolean;
            };
        };
        categories: {
            menageCategory: {
                name: string;
                id: string;
                isActive: boolean;
                description: string | null;
                icon: string | null;
            };
            electriciteCategory: {
                name: string;
                id: string;
                isActive: boolean;
                description: string | null;
                icon: string | null;
            };
        };
    }>;
}
