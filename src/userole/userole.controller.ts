import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../user/guards';
import { UseroleService } from './userole.service';
import { GetUser } from '../user/decorator';
import { UserroleDto } from './dto';

@UseGuards(JwtGuard)
@Controller('userole')
export class UseroleController {
  constructor(private userRoleService: UseroleService){}
  @Post("create/:id")
  public create(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: UserroleDto){
    return this.userRoleService.create(userId, id, dto);
  }

  @Patch("update/:id")
  public update(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: UserroleDto){
    return this.userRoleService.update(userId, id, dto);
  }

  @Delete("delete/:id")
  public delete(@GetUser("id") userId: any, @Param("id") id: number){
    return this.userRoleService.delete(userId, id);
  }

  @Get(":id")
  public findOne(@GetUser("id") userId: any, @Param("id") id: number){
    return this.userRoleService.findOne(userId, id);
  }

  @Get("all")
  public findAll(){
    return this.userRoleService.findAll();
  }
}
