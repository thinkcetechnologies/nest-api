import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BranchDto } from './dto';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService){}

  public async create(userId: any, uid: number, dto: BranchDto){
    try{
      const company = await this.prisma.company.findUnique({
        where: {
          Id: parseInt(String(uid)),
        }
      });
      if(company.user_id == userId.id) {
        return await this.prisma.branch.create({
          data: {
            name: dto.name,
            location: dto.location,
            company_id: company.Id,
            user_id: userId.id,
          }
        });
      }else{
        // noinspection ExceptionCaughtLocallyJS
        throw new ForbiddenException("Unauthorized access");
      }
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
  public async update(userId: any, uid: number, dto: BranchDto){
    try{
      const branch = await this.prisma.branch.findUnique({
        where: {
          id: parseInt(String(uid)),
        }
      });
      if(branch.user_id == userId.id){
        return await this.prisma.branch.update({
          where: {
            id: parseInt(String(uid)),
          },
          data: {
            ...dto,
          }
        });
      }else{
        // noinspection ExceptionCaughtLocallyJS
        throw new ForbiddenException("Unauthorized access");
      }
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
  public async delete(userId: any, uid: number){
    try{
      const branch = await this.prisma.branch.findUnique({
        where: {
          id: parseInt(String(uid)),
        }
      });
      if(branch.user_id == userId.id){
        return await this.prisma.branch.delete({
          where: {
            id: parseInt(String(uid)),
          }
        });
      }else{
        // noinspection ExceptionCaughtLocallyJS
        throw new ForbiddenException("Unauthorized access");
      }
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
  public async findAll(userId: any){
    try{
      return await this.prisma.branch.findMany({
        where: {
          user_id: userId.id,
        }
      });
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
  public async findOne(userId: any, uid: number){
    try{
      const branch = await this.prisma.branch.findUnique({
        where: {
          id: parseInt(String(uid)),
        }
      });
      if(branch.user_id == userId.id){
        return branch;
      }else{
        // noinspection ExceptionCaughtLocallyJS
        throw new ForbiddenException("Unauthorized access");
      }
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }
  }
}
