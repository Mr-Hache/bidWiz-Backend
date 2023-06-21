import { IsString, IsBoolean, IsNotEmpty, IsEnum, IsArray, ValidateNested, ValidateIf, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject } from 'src/schemas/subject.enum';
import { Language } from 'src/schemas/language.enum';
import { ExperienceDto } from './experience.dto';

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    uidFireBase: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsBoolean()
    @IsNotEmpty()
    isWizard: boolean

    @IsArray()
    @IsEnum(Language, { each: true })
    @ValidateIf(o => o.isWizard, { groups: ['wizard'] })
    languages: Language[];

    @IsArray()
    @IsEnum(Subject, { each: true })
    @ValidateIf(o => o.isWizard, { groups: ['wizard'] })
    subjects: Subject[];

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    @ValidateIf(o => o.isWizard, { groups: ['wizard'] })
    experience: ExperienceDto;

    @IsString()
    @ValidateIf(o => o.isWizard, { groups: ['wizard'] })
    image: string
}