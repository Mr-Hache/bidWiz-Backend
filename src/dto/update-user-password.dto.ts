import { IsString, IsNotEmpty, Matches} from 'class-validator';

export class UpdateUserPasswordDto{
    @IsString()
    @IsNotEmpty()
    @Matches( /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/, { message: 'Past password must contain at least one uppercase letter, one number, and one special character'})
    pastPassword: string

    @IsString()
    @IsNotEmpty()
    @Matches( /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/, { message: 'New password must contain at least one uppercase letter, one number, and one special character'})
    newPassword: string
}