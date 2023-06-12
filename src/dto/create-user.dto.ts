import { IsEmail, IsString, IsBoolean, IsNotEmpty, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
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
    languages: Language[];

    @IsArray()
    @IsEnum(Subject, { each: true })
    subjects: Subject[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    experiences: ExperienceDto[];


}