import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EdituserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

}
