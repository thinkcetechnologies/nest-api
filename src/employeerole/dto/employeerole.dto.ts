import { IsInt } from 'class-validator';

export class EmployeeroleDto {
  @IsInt()
  role_id: number;
}