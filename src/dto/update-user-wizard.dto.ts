import { IsEmail, IsString, IsBoolean, IsNotEmpty, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
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

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    experiences?: ExperienceDto[];
}