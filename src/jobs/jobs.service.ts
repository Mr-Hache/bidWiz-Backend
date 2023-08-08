import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from '../dto/create-job.dto';
import { Job, JobDocument } from '../schemas/jobs.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateJobWorkerDto } from '../dto/update-job-worker.dto';
import { Types } from 'mongoose';
import { UpdateJobReviewDto } from '../dto/update-job-client.dto';

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "TEST-6148664915482628-062215-38a98e32a8fa8c007c622d1a70f3ea0b-1404236451",
});

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
]

const hours = [
  '09:00 - 09:50',
  '10:00 - 10:50',
  '11:00 - 11:50',
  '12:00 - 12:50',
  '14:00 - 14:50',
  '15:00 - 15:50',
  '16:00 - 16:50',
  '17:00 - 17:50',
]



@Injectable()
export class JobsService {
    constructor(
        @InjectModel(Job.name) private jobModel: Model<JobDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    
    async createJob(createJobDto: CreateJobDto): Promise<Job> {
        const { clientId, workerId, subject, language, availability, numClasses, ...jobData } = createJobDto;

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

        const client = await this.userModel.findById(clientId).exec();
        if (!client) {
          throw new Error('Client not found');
        }

        if (!client.calendar || !client.calendar.days) {
          throw new Error('Client calendar days not defined');
        }

        if (!worker.calendar || !worker.calendar.days) {
          throw new Error('Worker calendar days not defined');
        }
        if (availability.length !== numClasses) {
          throw new Error('The number of classes does not match the provided availability');
        }

        const clientDaysMap = client.calendar.days;
        const workerDaysMap = worker.calendar.days;

        const job = new this.jobModel({
          ...jobData,
          client: clientId,
          worker: workerId,
          subject,
          language,
          availability,
        });
        
        // Mark time slots as booked
        availability.forEach(slot => {
          const clientDayValue = clientDaysMap.get(slot.day);
          const workerDayValue = workerDaysMap.get(slot.day);
        
          if (clientDayValue && workerDayValue) {
            const clientTimeSlotValue = clientDayValue.timeSlots.get(slot.hour) as any;
            const workerTimeSlotValue = workerDayValue.timeSlots.get(slot.hour) as any;
        
            if (clientTimeSlotValue && workerTimeSlotValue) {
              if (clientTimeSlotValue.isBooked || workerTimeSlotValue.isBooked) {
                throw new Error('One or more time slots are already booked');
              }
        
              clientTimeSlotValue.isBooked = true;
              workerTimeSlotValue.isBooked = true;
              clientTimeSlotValue.detailClass = job.description
              workerTimeSlotValue.detailClass = job.description
            }
          }
        });
        
        

      
    
      
        await client.save();
        await worker.save();

    

        
        
        job.availability = availability;
        job.numClasses = numClasses
        
    
        

        let preference = {
          items: [
            {
              title: job.description, 
              unit_price: job.price, 
              quantity: job.numClasses, 
              currency_id: "USD"
            },
          ],
          back_urls: {
            success: "https://bid-wiz-frontend.vercel.app/",
            failure: "https://bid-wiz-frontend.vercel.app/",
            pending: "",
          },
          auto_return: "approved",
        };
        
        
        let preferenceId;

        try {
            const response = await mercadopago.preferences.create(preference);
            preferenceId = response.body.id;
        } catch (error) {
            console.log(error);
        }

        job.result=preferenceId
        
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
          
          let sumRatings = 0;
          for (let job of jobs) {
              if (job.rating) {
                  sumRatings += job.rating;
              }
          }
         
          const averageRating = sumRatings / jobs.length;
          
          const user = await this.userModel.findById(workerId);
          if (!user) {
            throw new Error('User not found');
          }

          user.reviews = averageRating;
          user.experience.expJobs += 1
          await user.save();
      }
      
      async getTopEarners() {
        const topEarners = await this.jobModel.aggregate([
          { $group: { _id: { $toObjectId: "$worker" }, totalEarned: { $sum: { $multiply: ["$price", "$numClasses"] } }  } },
          {
              $lookup: {
                  from: 'users',
                  localField: '_id',
                  foreignField: '_id',
                  as: 'user_info'
              }
          },
          { $unwind: "$user_info" },
          { $sort: { totalEarned: -1 } },
          { $project: { totalEarned: 1, "user_info.name": 1, "user_info.image": 1 } },
          { $limit: 10 }
      ]);
      return topEarners;
    }

    async getTopBuyers() {
      const topBuyers = await this.jobModel.aggregate([
          { $group: { _id: { $toObjectId: "$client" }, totalPaid: { $sum: { $multiply: ["$price", "$numClasses"] } }  } },
          {
              $lookup: {
                  from: 'users',
                  localField: '_id',
                  foreignField: '_id',
                  as: 'user_info'
              }
          },
          { $unwind: "$user_info" },
          { $sort: { totalPaid: -1 } },
          { $project: { totalPaid: 1, "user_info.name": 1, "user_info.image": 1 } },
          { $limit: 10 }
      ]);
      return topBuyers;
  }

  async getTotalSalesAndRevenue() {
    const totalSales = await this.userModel.aggregate([
        { $match: { isWizard: true } },
        { $group: { _id: null, totalSales: { $sum: "$experience.expJobs" } } }
    ]);

    const totalRevenue = await this.jobModel.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$price", "$numClasses"] } } } }
    ]);

    return {
        totalSales: totalSales[0] ? totalSales[0].totalSales : 0,
        totalRevenue: totalRevenue[0] ? totalRevenue[0].totalRevenue : 0
    };
  }

    async getLanguageStats() {
      const languageStats = await this.jobModel.aggregate([
          { $group: { _id: "$language", count: { $sum: 1 } } },
          { $sort: { count: -1 } }
      ]);

      return languageStats;
  }

  async getSubjectStats() {
      const subjectStats = await this.jobModel.aggregate([
          { $group: { _id: "$subject", count: { $sum: 1 } } },
          { $sort: { count: -1 } }
      ]);

      return subjectStats;
  }
    

      
      
}
