import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ResultDto } from 'src/common/result.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './authentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) { }
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() body:CreateUserDto): Promise<ResultDto> {
    const user= await this.authenticationService.create(body);
    if(user == null){
        return new ResultDto({user},false);
    }
    return new ResultDto(user,true);
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body:LoginUserDto): Promise<ResultDto> {
     const result= await this.authenticationService.login(body);
     if(result == null){
        return new ResultDto({result},false);
      }
    return new ResultDto({token:result},true);
  }

  @Post('test')
  @UseGuards(AuthGuard)
  async post(): Promise<ResultDto> {
        return new ResultDto({},true);
  }
}
