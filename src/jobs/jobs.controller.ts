import { Controller, Post, Body, Patch } from '@nestjs/common';
import { CreateJobDto } from 'src/dto/create-job.dto';
import { JobsService } from './jobs.service';
import { UpdateJobWorkerDto } from 'src/dto/update-job-worker.dto';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    const createdJob = await this.jobsService.createJob(createJobDto);
    return createdJob;
  }

  @Patch('/worker')
async updateJobWorker(@Body() updateJobWorkerDto: UpdateJobWorkerDto) {
    const updatedJob = await this.jobsService.updateJobWorker(updateJobWorkerDto.jobId, updateJobWorkerDto.workerId, updateJobWorkerDto);
    return updatedJob;
}
}
