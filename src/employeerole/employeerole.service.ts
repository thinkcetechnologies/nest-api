import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeroleDto } from './dto';


@Injectable()
export class EmployeeroleService {
  constructor(private prisma: PrismaService) {
  }

  public async create(userId: any, id: number, dto: EmployeeroleDto) {
    try {
      const role = await this.prisma.role.findUnique({
        where: {
          id: dto.role_id,
        },
      });
      if (role.name != '') {
        return await this.prisma.employeeRole.create({
          data: {
            employee_id: parseInt(String(id)),
            user_id: userId.id,
            role_id: dto.role_id,
          },
        });
      }
    } catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }

  public async update(userId: any, id: number, dto: EmployeeroleDto) {
    try {
      const employeerole = await this.prisma.employeeRole.findUnique({
        where: {
          id: parseInt(String(id)),
        },
      });
      if (employeerole.user_id == userId.id) {
        return await this.prisma.employeeRole.update({
          where: {
            id: employeerole.id,
          },
          data: {
            ...dto,
          },
        });
      }
    } catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
  public async delete(userId: any, id: number){
    try{
      const employeerole = await this.prisma.employeeRole.findUnique({
        where: {
          id: parseInt(String(id)),
        },
      });
      if(employeerole.user_id == userId.id){
        return await this.prisma.employeeRole.delete({
          where: {
            id: parseInt(String(id)),
          },
        });
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
  public async findOne(userId: any, id: number){
    try{
      const employeerole = await this.prisma.employeeRole.findUnique({
        where: {
          id: parseInt(String(id)),
        }
      });
      if(employeerole.user_id == userId.id){
        return employeerole;
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
  public async findAll(userId: any){
    try{
      return await this.prisma.employeeRole.findMany({
        where: {
          user_id: userId.id,
        }
      });

    }catch (e) {
      throw new ForbiddenException('An error occurred');
    }
  }
}
