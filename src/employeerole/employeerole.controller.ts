import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EmployeeroleService } from './employeerole.service';
import { GetUser } from '../user/decorator';
import { EmployeeroleDto } from './dto';
import { JwtGuard } from '../user/guards';

@UseGuards(JwtGuard)
@Controller('employeerole')
export class EmployeeroleController {
  constructor(private employeeRoleService: EmployeeroleService){}

  @Post("create/:id")
  public create(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: EmployeeroleDto){
    return this.employeeRoleService.create(userId, id, dto);
  }

  @Patch("update/:id")
  public update(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: EmployeeroleDto){
    return this.employeeRoleService.update(userId, id, dto);
  }

  @Delete("delete/:id")
  public delete(@GetUser("id") userId: any, @Param("id") id: number){
    return this.employeeRoleService.delete(userId, id);
  }

  @Get(":id")
  public findOne(@GetUser("id") userId: any, @Param("id") id: number){
    return this.employeeRoleService.findOne(userId, id);
  }

  @Get("all")
  public findAll(@GetUser("id") userId: any){
    return this.employeeRoleService.findAll(userId);
  }
}
