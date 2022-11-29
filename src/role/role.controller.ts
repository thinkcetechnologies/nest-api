import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtGuard } from '../user/guards';
import { RoleDto } from './dto';

@UseGuards(JwtGuard)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService){}

  @Post("create")
  public create(@Body() dto: RoleDto){
    return this.roleService.create(dto);
  }

  @Patch("update/:id")
  public update(@Param("id") id: number, @Body() dto: any){
    return this.roleService.update(id, dto);
  }

  @Delete("delete/:id")
  public delete(@Param("id") id: number){
    return this.roleService.delete(id);
  }

  @Get(":id")
  public findOne(@Param("id") id: number){
    return this.roleService.findOne(id);
  }
  @Get("all")
  public findAll(){
    return this.roleService.findAll();
  }
}
