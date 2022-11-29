import { IsInt } from 'class-validator';

export class UserroleDto {
  @IsInt()
  role_id: number;
}