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
}
