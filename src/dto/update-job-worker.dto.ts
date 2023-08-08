import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { JobStatus } from '../schemas/jobStatus.enum';
import { Types } from 'mongoose';

export class UpdateJobWorkerDto{
    @IsNotEmpty()
    @IsEnum(JobStatus)
    status: JobStatus;

}