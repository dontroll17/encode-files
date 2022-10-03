import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdatePasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Min(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Min(8)
    newPassword: string;
}