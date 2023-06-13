import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Language } from './language.enum';
import { Subject } from './subject.enum';
import { Role } from './role.enum';
import { Experience, ExperienceSchema } from './experience.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, required: true })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop({ required: true })
  isWizard: boolean;

  @Prop({ type: [String], enum: Language, default: [] })
  languages: Language[];

  @Prop({ type: [String], enum: Subject, default: [] })
  subjects: Subject[];

  @Prop({ type: ExperienceSchema, default: {} })
  experience: Experience;

  @Prop({ required: true, default: false })
  isDisabled: boolean;

  @Prop({ type: [String], enum: Role, default: ["user"] }) 
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
