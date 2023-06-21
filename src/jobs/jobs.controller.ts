import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { CreateJobDto } from 'src/dto/create-job.dto';
import { JobsService } from './jobs.service';
import { UpdateJobWorkerDto } from 'src/dto/update-job-worker.dto';
import { UpdateJobReviewDto } from 'src/dto/update-job-client.dto';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    const createdJob = await this.jobsService.createJob(createJobDto);
    return createdJob;
  }

  @Patch('/finish/:jobId/:workerId')
async updateJobWorker(@Param('jobId') jobId: string, @Param('workerId') workerId: string, @Body() updateJobWorkerDto: UpdateJobWorkerDto) {
  const updatedJob = await this.jobsService.updateJobWorker(jobId, workerId, updateJobWorkerDto);
  return updatedJob;
}

@Patch('/review/:jobId/:clientId')
async updateJobReview(@Param('jobId') jobId: string, @Param('clientId') clientId: string, @Body() updateJobReviewDto: UpdateJobReviewDto) {
  const updatedJob = await this.jobsService.updateJobReview(jobId, clientId, updateJobReviewDto);
  return updatedJob;
}
}
