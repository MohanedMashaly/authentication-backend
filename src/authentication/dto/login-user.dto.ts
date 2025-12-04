import { IsEmail, IsOptional, IsString, IsStrongPassword, Matches, Min } from "class-validator";

export class LoginUserDto{
    @IsEmail()
    email:string;
    @IsString()
    password:string;
}