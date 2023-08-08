import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job, JobSchema } from '../schemas/jobs.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }, { name: User.name, schema: UserSchema }])],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
