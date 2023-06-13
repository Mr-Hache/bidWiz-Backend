import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema()
export class Experience {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true, default: 0 })
  expJobs: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);