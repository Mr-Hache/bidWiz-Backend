import { IsEmail, IsString, IsBoolean, IsNotEmpty, IsEnum, IsArray, ValidateNested } from 'class-validator';

export class UpdateUserPasswordDto{
    @IsString()
    @IsNotEmpty()
    pastPassword: string

    @IsString()
    @IsNotEmpty()
    newPassword: string
}