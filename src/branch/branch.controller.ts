import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { JwtGuard } from '../user/guards';
import { GetUser } from '../user/decorator';
import { BranchDto } from './dto';

@UseGuards(JwtGuard)
@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService){}

  @Post("create/:id")
  public create(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: BranchDto){
    return this.branchService.create(userId, id, dto);
  }
  @Patch("update/:id")
  public update(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: BranchDto){
    return this.branchService.update(userId, id, dto);
  }
  @Delete("delete/:id")
  public delete(@GetUser("id") userId: any, @Param("id") id: number){
    return this.branchService.delete(userId, id);
  }
  @Get(":id")
  public getOne(@GetUser("id") userId: any, @Param("id") id: number){
    return this.branchService.findOne(userId, id);
  }
  @Get("all")
  public getAll(@GetUser("id") userId: any){
    return this.branchService.findAll(userId);
  }
}
