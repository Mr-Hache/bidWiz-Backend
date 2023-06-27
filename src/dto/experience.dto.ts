import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Title } from 'src/schemas/title.enum';
import { Origin } from 'src/schemas/origin.enum';
export class ExperienceDto {
    @IsString()
    @IsEnum(Title)
    title: Title;

    @IsString()
    @IsEnum(Origin)
    origin: Origin;

}
