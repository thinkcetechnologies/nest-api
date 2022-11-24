import { IsString } from 'class-validator';

export class BranchDto {
  @IsString()
  name: string;

  @IsString()
  location: string;


}