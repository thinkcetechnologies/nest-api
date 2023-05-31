import { IsInt, IsString } from 'class-validator';

export class CompanyDto {
  @IsString()
  company_name: string;

  @IsString()
  location: string;

  @IsString()
  company_address: string;

  @IsInt()
  company_size: number;

  @IsInt()
  branches: number;

  @IsString()
  type: string;

}