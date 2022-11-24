import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../user/guards';
import { CompanyService } from './company.service';
import { GetUser } from '../user/decorator';
import { CompanyDto, EditCompanyDto } from './dto';

@UseGuards(JwtGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService){}

  @Post("create")
  public create(@GetUser("id") userId: number, @Body() dto: CompanyDto ){
    return this.companyService.create(userId, dto);
  }

  @Patch("update/:id")
  public update(@GetUser("id")  userId: any, @Param("id") id: number, @Body() dto: EditCompanyDto){
    return this.companyService.update(userId, id,  dto);
  }

  @Delete("delete/:id")
  public delete(@GetUser("id") userId: any, @Param("id") id: number){
    return this.companyService.delete(userId, id);
  }
  @Get()
  public findAll(@GetUser("id") userId: any){
    return this.companyService.findAll(userId);
  }
  @Get(":id")
  public findOne(@Param("id") id: number){
    return this.companyService.findOne(id);
  }
}
