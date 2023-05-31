import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyDto, EditCompanyDto } from './dto';


@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService){}
  public async create(userId: any, dto: CompanyDto){
      try{
        return await this.prisma.company.create({
          data: {
            company_name: dto.company_name,
            location: dto.location,
            type: dto.type,
            branches: dto.branches,
            company_address: dto.company_address,
            company_size: dto.company_size,
            user_id: userId.id,
          }
        });
      }catch (e) {
        return e.toString();
      }
  }
  public async update(userId: any, uid: number,  dto: EditCompanyDto){
    try {
      const company = await this.prisma.company.findUnique({
        where: {
          Id: parseInt(String(uid)),
        }
      });
      if (company.user_id == userId.id) {
        return await this.prisma.company.update({
          where: {
            Id: parseInt(String(uid)),
          },
          data: {
            ...dto,
          },
        });
      } else {
        throw new ForbiddenException('Unauthorized Access');
      }
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
  public async delete(userId: any, uid: number){
    try{
      const company = await this.prisma.company.findUnique({
        where: {
          Id: parseInt(String(uid)),
        },
      });
      if(company.user_id == userId.id){
        return await this.prisma.company.delete({
          where: {
            Id: parseInt(String(uid)),
          }
        });
      }else{
        throw new ForbiddenException('Unauthorized Access');
      }
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
  public async findAll(userId: any){
    try{
      return await this.prisma.company.findMany({
        where: {
          user_id: userId.id,
        },
      })
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
  public async findOne(uid: number){
    try{
      return await this.prisma.company.findUnique({
        where: {
          Id: parseInt(String(uid)),
        }
      });

    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
}
