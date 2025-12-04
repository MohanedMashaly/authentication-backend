import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsStrongPassword, Matches, Min } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    @ApiProperty({
        description: 'Email of the user',
        required: true,
    })
    email:string;

    @IsString()
    @Min(3)
    @ApiProperty({
        description: 'Name of the user',
        required: true,
    })
    name:string;

    @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password too weak. Must contain at least 8 characters, one letter, one number, and one special character.'})
    @ApiProperty({
        description: 'Password, password must meet the following criteria(least 8 characters, one letter, one number, and one special character)',
        required: true,
    })
    password:string;

}