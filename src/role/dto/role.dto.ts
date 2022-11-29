import { IsInt, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  code: number;

}