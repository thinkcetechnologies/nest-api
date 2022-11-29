import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';
import { EmployeeModule } from './employee/employee.module';
import { RoleModule } from './role/role.module';
import { EmployeeroleModule } from './employeerole/employeerole.module';
import { UseroleModule } from './userole/userole.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, PrismaModule, CompanyModule, BranchModule, EmployeeModule, RoleModule, EmployeeroleModule, UseroleModule],
})
export class AppModule {
}

