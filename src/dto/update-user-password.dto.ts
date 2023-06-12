import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserPasswordDto{
    @IsString()
    @IsNotEmpty()
    pastPassword: string

    @IsString()
    @IsNotEmpty()
    newPassword: string
}