import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { EdituserDto, UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,private jwt: JwtService, private config: ConfigService){}
  public async create(dto: UserDto){
      const password = await argon.hash(dto.password);
      try{
        const user = await this.prisma.user.create({
          data: {
            email: dto.email,
            password,
          }
        });
        return this.signToken(user.id, user.email);
      }catch (e) {
        if(e instanceof PrismaClientKnownRequestError){
          if(e.code == "P2002"){
            throw new ForbiddenException("Email Already Exists");
          }
        }
        throw e;
      }
  }
  public async signToken(userId: number, email: string) : Promise<{access_token: string}>{
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "200m",
      secret: this.config.get("JWT_SECRET_KEY")
    });
    return {
      access_token: token,
    };
  }
  public async update(userId: any, dto: EdituserDto){
      const uid = userId.id;
      const user = await this.prisma.user.update({
        where: {
          id: uid
        },
        data: {
          ...dto,
        }
      });
      delete user.password;
      return user;
  }
  public async signin(dto: UserDto){
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    });
    if(!user){
      throw new ForbiddenException("Invalid Email");
    }
    const checkPassword = await argon.verify(user.password, dto.password);
    if(!checkPassword){
      throw new ForbiddenException("Password incorrect");
    }
    return this.signToken(user.id, user.email);
  }
}
