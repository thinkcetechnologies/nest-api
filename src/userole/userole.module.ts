import { Module } from '@nestjs/common';
import { UseroleService } from './userole.service';
import { UseroleController } from './userole.controller';

@Module({
  providers: [UseroleService],
  controllers: [UseroleController]
})
export class UseroleModule {}
