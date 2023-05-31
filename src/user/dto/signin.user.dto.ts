import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}