import { IsString, IsBoolean, IsEnum, IsArray, ValidateNested, IsOptional, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject } from 'src/schemas/subject.enum';
import { Language } from 'src/schemas/language.enum';
import { ExperienceDto } from './experience.dto';

export class UpdateUserWizardDto{
    @IsBoolean()
    @IsOptional()
    isWizard?: boolean

    @IsArray()
    @IsOptional()
    @IsEnum(Language, { each: true })
    languages?: Language[];

    @IsArray()
    @IsOptional()
    @IsEnum(Subject, { each: true })
    subjects?: Subject[];

    @IsObject()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    experiences?: ExperienceDto[];

    @IsString()
    @IsOptional()
    image?: string
}