import { IsInt, IsString } from 'class-validator';

export class CompanyDto {
  @IsString()
  company_name: string;

  @IsString()
  location: string;

  @IsInt()
  branches: number;

  @IsString()
  type: string;

}