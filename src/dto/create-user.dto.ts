import { IsString, IsBoolean, IsNotEmpty, IsEnum, IsArray, ValidateNested, ValidateIf, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Subject } from '../schemas/subject.enum';
import { Language } from '../schemas/language.enum';
import { ExperienceDto } from './experience.dto';

const timeSlots = {
    '09:00 - 09:50': { isBooked: false },
    '10:00 - 10:50': { isBooked: false },
    '11:00 - 11:50': { isBooked: false },
    '12:00 - 12:50': { isBooked: false },
    '14:00 - 14:50': { isBooked: false },
    '15:00 - 15:50': { isBooked: false },
    '16:00 - 16:50': { isBooked: false },
    '17:00 - 17:50': { isBooked: false },
    };

    const days = {
        Monday: { timeSlots },
        Tuesday: { timeSlots },
        Wednesday: { timeSlots },
        Thursday: { timeSlots },
        Friday: { timeSlots },
      };
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

    @IsObject()
    calendar = { days };
}