import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type JobDocument = Job & Document;

export enum JobStatus {
  IN_PROGRESS = 'In Progress',
  FINISHED = 'Finished'
}

@Schema()
export class Job {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  client: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  worker: User;

  @Prop({ required: true, enum: JobStatus })
  status: JobStatus;
}

export const JobSchema = SchemaFactory.createForClass(Job);
