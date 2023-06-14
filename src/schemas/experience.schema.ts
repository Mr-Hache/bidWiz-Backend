import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema()
export class Experience {
  @Prop({ })
  title: string;

  @Prop({ })
  origin: string;

  @Prop({ default: 0 })
  expJobs: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);