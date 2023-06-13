import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ExperienceDto {
    @IsString()
    title: string;

    @IsString()
    origin: string;

}
