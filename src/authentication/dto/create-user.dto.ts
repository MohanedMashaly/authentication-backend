import { IsEmail, IsOptional, IsString, IsStrongPassword, Matches, Min } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    @Min(3)
    name:string;

    @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password too weak. Must contain at least 8 characters, one letter, one number, and one special character.'})
    password:string;

}