import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService){}

  public async create(dto: RoleDto){
    try{
      if(dto.name != undefined && dto.code != undefined){
        if(dto.name != "" && dto.code != null){
          return await this.prisma.role.create({
            data: {
              name: dto.name,
              code: dto.code,
            }
          });
        }
      }

    }catch (e) {
      throw new ForbiddenException("An error occurred");
    }
  }
  public async update(id: number, dto: RoleDto){
    try{
      return await this.prisma.role.update({
        where: {
          id: parseInt(String(id)),
        },
        data: {
          ...dto,
        }
      })
    }catch (e) {
      throw new ForbiddenException("An error occurred");
    }
  }
  public async delete(id: number){
    try{
      return await this.prisma.role.delete({
        where: {
          id: parseInt(String(id)),
        }
      })
    }catch (e) {
      throw new ForbiddenException("An error occurred");
    }
  }
  public async findOne(id: number){
    try{
      return await this.prisma.role.findUnique({
        where: {
          id: parseInt(String(id)),
        }
      })
    }catch (e) {
      throw new ForbiddenException("An error occurred");
    }
  }
  public async findAll(){
    try{
      return await this.prisma.role.findMany();
    }catch (e) {
      throw new ForbiddenException("An error occurred");
    }
  }
}
