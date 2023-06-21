import { Controller, Post, Body } from '@nestjs/common';
import { CreateJobDto } from 'src/dto/create-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    const createdJob = await this.jobsService.createJob(createJobDto);
    return createdJob;
  }
}
