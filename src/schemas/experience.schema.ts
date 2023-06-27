import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Title } from './title.enum';
import { Origin } from './origin.enum';

export type ExperienceDocument = Experience & Document;

@Schema()
export class Experience {
  @Prop({ type: [String], enum: Title, default: [] })
  title: Title[];

  @Prop({ type: [String], enum: Origin, default: [] })
  origin: Origin[];

  @Prop({ default: 0 })
  expJobs: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);