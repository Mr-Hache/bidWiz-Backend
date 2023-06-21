import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { JobStatus } from 'src/schemas/jobStatus.enum';

export class UpdateJobWorkerDto{
    @IsNotEmpty()
    @IsEnum(JobStatus)
    status: JobStatus;

}