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
        // @ts-ignore
        return await this.prisma.branch.create({
          data: {
            name: dto.name,
            location: dto.location,
            company_id: company.Id,
            user_id: userId.id,
          }
        });
      }else{
        throw new ForbiddenException("Unauthorized access");
      }
    }catch (e) {
      throw new ForbiddenException("An error occurred!!!!");
    }

  }
}
