import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Title } from '../schemas/title.enum';
import { Origin } from '../schemas/origin.enum';
export class ExperienceDto {
    @IsString()
    @IsEnum(Title)
    title: Title;

    @IsString()
    @IsEnum(Origin)
    origin: Origin;

}
