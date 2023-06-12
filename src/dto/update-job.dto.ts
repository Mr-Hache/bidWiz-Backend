import { IsNotEmpty, IsEnum } from 'class-validator';
import { JobStatus } from 'src/schemas/jobStatus.enum';

export class UpdateJobDto{
    @IsNotEmpty()
    @IsEnum(JobStatus)
    status: JobStatus;
}