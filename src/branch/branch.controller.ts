import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
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
}
