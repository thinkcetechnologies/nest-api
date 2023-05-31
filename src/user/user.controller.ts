import { Body, Controller, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { EdituserDto, SigninUserDto, UserDto } from './dto';
import { GetUser } from './decorator';
import { JwtGuard } from './guards';

@Controller('user')
export class UserController {

  constructor(public userService: UserService){}

  @Post("create")
  public create(@Body() dto: UserDto){
    return this.userService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Patch("update")
  public update(@GetUser('id') userId: number, @Body() dto: EdituserDto){
    return this.userService.update(userId, dto);
  }
  @Post("signin")
  public signin(@Body() dto: SigninUserDto){
    return this.userService.signin(dto);
  }
}
