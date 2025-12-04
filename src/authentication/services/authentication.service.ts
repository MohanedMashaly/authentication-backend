import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthJwtService } from './authentication.jwt.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
     private readonly authJWTService: AuthJwtService,
     private readonly userService: UserService) {}
  async create(createUserDto: CreateUserDto): Promise<UserDto|null> {
    try{
    const isUserExists = await this.userService.findOne(createUserDto.email);
    if(isUserExists){
      throw new BadRequestException("User Email Already exists");
    }
    const hashedPassword = (await this.userService.encryptPassword(createUserDto.password)).toString();
    createUserDto.password = hashedPassword;
    const createUser = await this.userService.create(createUserDto);
    return createUser;
    }
    catch(err)
    {
      return null;
    }
  }
  
  async login(loginUserDto: LoginUserDto):Promise<string|null>{
    try{
    const user = await this.userService.findOne(loginUserDto.email);
    if(user){
      const isPasswordCorrect = await this.userService.decryptPassword(loginUserDto.password,user?.password);
      if(!isPasswordCorrect) {
        throw new BadRequestException("Invalid password");
      }
      const result = this.authJWTService.generateJwtToken({name:user?.name});
      return result;
    }else{
      throw new BadRequestException("User Email Does not exists");
    }
    }
    catch(err){
      return null;
    }
  }
  


}
