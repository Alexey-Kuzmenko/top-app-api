import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsEmail()
    login: string;

    @IsString()
    @IsNotEmpty({ message: 'Invalid password' })
    password: string;
};