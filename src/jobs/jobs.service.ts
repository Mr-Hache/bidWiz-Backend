import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from 'src/dto/create-job.dto';
import { Job, JobDocument } from 'src/schemas/jobs.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UpdateJobWorkerDto } from 'src/dto/update-job-worker.dto';
import { Types } from 'mongoose';
import { UpdateJobReviewDto } from 'src/dto/update-job-client.dto';
import { log } from 'console';

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(Job.name) private jobModel: Model<JobDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    
    async createJob(createJobDto: CreateJobDto): Promise<Job> {
        const { clientId, workerId, subject, language, ...jobData } = createJobDto;

        const worker = await this.userModel.findById(workerId).exec();
        if (!worker) {
        throw new Error('Worker not found');
        }

        if (!worker.subjects.includes(subject)) {
        throw new Error('Worker does not have the specified subject');
        }

        if (!worker.languages.includes(language)) {
        throw new Error('Worker does not have the specified language');
        }

        const job = new this.jobModel({
        ...jobData,
        client: clientId,
        worker: workerId,
        subject,
        language,
        });

        return job.save();
    }

    async updateJobWorker(
        jobId: string,
        workerId: string,
        updateJobWorkerDto: UpdateJobWorkerDto,
      ): Promise<Job> {
        const { status } = updateJobWorkerDto;
      
        const job = await this.jobModel.findOneAndUpdate(
          { _id: (jobId), worker: (workerId), status: "In Progress" },
          { status },
          { new: true },
        );
      
        if (!job) {
          throw new Error('Job not found or worker is not assigned to the job');
        }
      
        return job;
      }

      async updateJobReview(
        jobId: string,
        clientId: string,
        updateJobReviewDto: UpdateJobReviewDto,
      ): Promise<Job> {
        const { rating } = updateJobReviewDto;
      
        const job = await this.jobModel.findOneAndUpdate(
            { _id: (jobId), client: (clientId), status: "Finished" },
            { rating },
            { new: true },
          );
        
          if (!job) {
            throw new Error('Job not found or worker is not assigned to the job');
          }
        
          const worker = await this.userModel.findById(job.worker).exec();
          if (!worker) {
          throw new Error('Worker not found');
            }
          await this.calculateAverageRating(worker._id.toString())
          return job;
        }
      
        async getJobsByWorker(workerId: string): Promise<Job[]> {
            const jobs = await this.jobModel.find({ worker: (workerId) }).exec();
            if (!jobs) {
              throw new Error('No jobs found for this worker');
            }
            return jobs;
        }
    
        async getJobsByClient(clientId: string): Promise<Job[]> {
            const jobs = await this.jobModel.find({ client: (clientId) }).exec();
            if (!jobs) {
              throw new Error('No jobs found for this client');
            }
            return jobs;
        }
      
        async calculateAverageRating(workerId: string) {
          const jobs = await this.getJobsByWorker(workerId);
          
          if (jobs.length === 0) {
              throw new Error('No jobs found for this worker');
          }
          console.log(`el worker id si llega ${workerId}`);
          
          let sumRatings = 0;
          for (let job of jobs) {
              if (job.rating) {
                  sumRatings += job.rating;
              }
          }
          console.log(`la sum rating es ${sumRatings}`);
          const averageRating = sumRatings / jobs.length;
          console.log(`el job leng ${jobs.length}`);
          const user = await this.userModel.findById(workerId);
          if (!user) {
            throw new Error('User not found');
          }

          user.reviews = averageRating;
          await user.save();
      }
      

      
      
}
