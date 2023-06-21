import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { JobStatus } from 'src/schemas/jobStatus.enum';
import { Types } from 'mongoose';

export class UpdateJobWorkerDto{
    @IsNotEmpty()
    @IsEnum(JobStatus)
    status: JobStatus;

    @IsNotEmpty()
    @IsString()
    jobId: string;

    @IsNotEmpty()
    @IsString()
    workerId: string;

}