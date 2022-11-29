import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserroleDto } from './dto';

@Injectable()
export class UseroleService {

  constructor(private prisma: PrismaService) {
  }

  public async create(userId: any, id: number, dto: UserroleDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(String(id)),
        },
      });
      if (user != null) {
        return await this.prisma.userRole.create({
          data: {
            uid: userId.id,
            user_id: user.id,
            role_id: dto.role_id,
          },
        });
      }
    } catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
  public async update(userId: any, id: number, dto: UserroleDto){
    try{
      const userrole = await this.prisma.userRole.findUnique({
        where: {
          id: parseInt(String(id)),
        }
      });
      if(userrole.uid == userId.id){
        return await this.prisma.userRole.update({
          where: {
            id: parseInt(String(id)),
          },
          data: {
            ...dto,
          }
        });
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
  public async delete(userId: any, id: number){
    try{
      const userrole = await this.prisma.userRole.findUnique({
        where: {
          id: parseInt(String(id)),
        }
      });
      if(userrole.uid == userId.id){
        return await this.prisma.userRole.delete({
          where: {
            id: parseInt(String(id)),
          }
        });
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
  public async findOne(userId: any, id: number){
    try{
      const userrole = await this.prisma.userRole.findUnique({
        where: {
          id: parseInt(String(id)),
        }
      });
      if(userrole.uid == userId.id || userrole.user_id == userId.id){
        return userrole;
      }else{
        return {"message": "unauthorized access"};
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
  public async findAll(){
    try{
      return await this.prisma.userRole.findMany();
    }catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
}
