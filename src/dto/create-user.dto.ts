import { IsEmail, IsString, IsBoolean, IsNotEmpty, IsEnum, IsArray, ValidateNested, ValidateIf, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject } from 'src/schemas/subject.enum';
import { Language } from 'src/schemas/language.enum';
import { ExperienceDto } from './experience.dto';

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

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
    experiences: ExperienceDto[];
}