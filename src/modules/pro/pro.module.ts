import { Module } from '@nestjs/common';
import { ProController } from './pro.controller';
import { ProDiscoveryController } from './pro-discovery.controller';
import { ProService } from './pro.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [ProController, ProDiscoveryController],
  providers: [ProService, PrismaService],
})
export class ProModule {}
