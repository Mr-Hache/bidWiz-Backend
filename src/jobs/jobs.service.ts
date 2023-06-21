import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from 'src/dto/create-job.dto';
import { Job, JobDocument } from 'src/schemas/jobs.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(Job.name) private jobModel: Model<JobDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
      ) {}
    
      async createJob(createJobDto: CreateJobDto): Promise<Job> {
        const { clientId, workerId, ...jobData } = createJobDto;
    
        const client = await this.userModel.findById(clientId).exec();
        const worker = await this.userModel.findById(workerId).exec();
    
        const job = new this.jobModel({
          ...jobData,
          client,
          worker,
        });
    
        return job.save();
      }
}
