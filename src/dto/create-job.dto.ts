import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { JobStatus } from 'src/schemas/jobStatus.enum';

export class CreateJobDto {
    @IsNotEmpty()
    @IsEnum(JobStatus)
    status: JobStatus;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
