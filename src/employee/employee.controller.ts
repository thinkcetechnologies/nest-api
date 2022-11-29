import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { GetUser } from '../user/decorator';
import { EmployeeDto } from './dto';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService){}

  @Post("create/:id")
  public create(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: EmployeeDto){
    return this.employeeService.create(userId, id, dto);
  }
  @Patch("update/:id")
  public update(@GetUser("id") userId: any, @Param("id") id: number, @Body() dto: EmployeeDto){
    return this.employeeService.update(userId, id, dto);
  }

  @Delete("delete/:id")
  public delete(@GetUser("id") userId: any, @Param("id") id: number){
    return this.employeeService.delete(userId, id);
  }
  @Get(":id")
  public findOne(@GetUser("id") userId: any, @Param("id") id: number){
    return this.employeeService.findOne(userId, id);
  }
  @Get("all")
  public findAll(@GetUser("id") userId: any){
    return this.employeeService.findAll(userId);
  }
}
