import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  public async create(userId: any, id: number, dto: EmployeeDto) {
    try {
      const branch = await this.prisma.branch.findUnique({
        where: {
          id: parseInt(String(id)),
        },
      });
      const company = await this.prisma.company.findUnique({
        where: {
          Id: branch.company_id,
        },
      });
      if (company.user_id == userId.id && branch.user_id == userId.id) {
        return await this.prisma.employee.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            contact: dto.contact,
            company_id: company.Id,
            branch_id: branch.id,
            user_id: userId.id,
          }
        });
      }else{
        throw new ForbiddenException('Unauthorized access');
      }
    } catch (e) {
      throw new ForbiddenException('An error occurred!!!');
    }
  }
  public async update(userId: any, id: number, dto: EmployeeDto) {
    try{
      const employee = await this.prisma.employee.findUnique({
        where: {
          id: parseInt(String(id)),
        }
      });
      if(employee.user_id == userId.id){
        return await this.prisma.employee.update({
          where: {
            id: parseInt(String(id)),
          },
          data: {
            ...dto,
          }
        });
      }else{
        throw new ForbiddenException('Unauthorized access');
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred!!!');
    }
  }
  public async delete(userId: any, id: number){
    try{
      const employee = await this.prisma.employee.findUnique({
        where: {
          id: parseInt(String(id)),
        }
      });
      if(employee.user_id == userId.id){
        return await this.prisma.employee.delete({
          where: {
            id: parseInt(String(id)),
          }
        });
      }else{
        throw new ForbiddenException('Unauthorized access');
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred!!!');
    }
  }
  public async findOne(userId: any, id: number){
    try{
      const employee = await this.prisma.employee.findUnique({
        where: {
          id: parseInt(String(id))
        }
      });
      if(employee.user_id == userId.id){
        return employee;
      }else{
        throw new ForbiddenException('Unauthorized access');
      }
    }catch (e) {
      throw new ForbiddenException('An error occurred!!!');
    }
  }
  public async findAll(userId: any){
    try{
      return await this.prisma.employee.findMany({
        where: {
          user_id: userId.id
        }
      });

    }catch (e) {
      throw new ForbiddenException('An error occurred!!!');
    }
  }
  public async find(userId: any, id: number){
    try{
      return await this.prisma.employee.findMany();

    }catch (e) {
      throw new ForbiddenException('An error occurred!!!');
    }
  }
}
