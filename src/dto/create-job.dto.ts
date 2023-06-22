import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator';
import { JobStatus } from 'src/schemas/jobStatus.enum';
import { Language } from 'src/schemas/language.enum';
import { Subject } from 'src/schemas/subject.enum';
import { Types } from 'mongoose';

export class CreateJobDto {
    @IsNotEmpty()
    @IsEnum(JobStatus)
    status: JobStatus;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    clientId: Types.ObjectId; 
  
    @IsNotEmpty()
    @IsString()
    workerId: Types.ObjectId; 

    @IsNotEmpty()
    @IsEnum(Language)
    language: Language;

    @IsNotEmpty()
    @IsEnum(Subject)
    subject: Subject;

}
