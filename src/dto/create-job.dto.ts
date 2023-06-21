import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator';
import { JobStatus } from 'src/schemas/jobStatus.enum';
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

}
