import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ExperienceDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    origin: string;

    @IsNotEmpty()
    @IsNumber()
    expYears: number;
}
