import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UserModule, PrismaModule, CompanyModule, BranchModule],
})
export class AppModule {}

