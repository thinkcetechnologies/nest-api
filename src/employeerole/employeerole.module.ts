import { Module } from '@nestjs/common';
import { EmployeeroleService } from './employeerole.service';
import { EmployeeroleController } from './employeerole.controller';

@Module({
  providers: [EmployeeroleService],
  controllers: [EmployeeroleController]
})
export class EmployeeroleModule {}
