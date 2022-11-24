import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
