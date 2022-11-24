import { IsInt, IsString } from 'class-validator';

export class EditCompanyDto {
  @IsString()
  company_name: string;

  @IsString()
  location: string;

  @IsInt()
  branches: number;

}