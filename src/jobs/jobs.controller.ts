import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
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

    @Get('/worker/:workerId')
    async getJobsByWorker(@Param('workerId') workerId: string) {
        const jobs = await this.jobsService.getJobsByWorker(workerId);
        return jobs;
    }

    @Get('/client/:clientId')
    async getJobsByClient(@Param('clientId') clientId: string) {
        const jobs = await this.jobsService.getJobsByClient(clientId);
        return jobs;
    }

    @Get('top-earners')
    async getTopEarners() {
        const topEarners = await this.jobsService.getTopEarners();
        return topEarners;
    }

    @Get('top-buyers')
    async getTopBuyers() {
        const topBuyers = await this.jobsService.getTopBuyers();
        return topBuyers;
    }

    @Get('/totals')
    async getTotalSalesAndRevenue() {
        const totals = await this.jobsService.getTotalSalesAndRevenue();
        return totals;
    }

    @Get('/language-stats')
    async getLanguageStats() {
        const languageStats = await this.jobsService.getLanguageStats();
        return languageStats;
    }

    @Get('/subject-stats')
    async getSubjectStats() {
        const subjectStats = await this.jobsService.getSubjectStats();
        return subjectStats;
    }

}
