import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Language } from './language.enum';
import { Subject } from './subject.enum';
import { Experience, ExperienceSchema } from './experience.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop({ unique: true, required: true })
  isWizard: boolean;

  @Prop({ type: [String], enum: Language, default: [] })
  languages: Language[];

  @Prop({ type: [String], enum: Language, default: [] })
  subjects: Subject[];

  @Prop({ type: ExperienceSchema, default: {} })
  experience: Experience;
}

export const UserSchema = SchemaFactory.createForClass(User);
