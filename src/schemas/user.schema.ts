import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Language } from './language.enum';
import { Subject } from './subject.enum';
import { Role } from './role.enum';
import { Experience, ExperienceSchema } from './experience.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true,
    match: [/^\S*$/, 'Username should not contain whitespace'],
  })
  username: string;

  @Prop({ required: true })
  name: string;


  @Prop({ required: true,
    match: [/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/, 'Password must contain at least one uppercase letter, one number, and one special character']
  })


  @Prop({ unique: true, required: true,
    match: [/\S+@\S+\.\S+/, 'Email should be a valid email address']
  })
  email: string;

  @Prop({ unique: true, required: true,
    match: [/^\+[1-9]\d{1,3}\s?\d{6,14}$/, 'Phone number must include country code and your number']
  })
  phoneNumber: string;

  @Prop({ required: true })
  isWizard: boolean;

  @Prop({ type: [String], enum: Language, default: [] })
  languages: Language[];

  @Prop({ type: [String], enum: Subject, default: [] })
  subjects: Subject[];

  @Prop({ type: ExperienceSchema, default: {} })
  experience: Experience;

  @Prop({ default: "" })
  image: string;

  @Prop({ default: false })
  isDisabled: boolean;

  @Prop({ type: [String], enum: Role, default: ["user"] }) 
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
