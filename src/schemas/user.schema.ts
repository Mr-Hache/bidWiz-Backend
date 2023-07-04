import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Language } from './language.enum';
import { Subject } from './subject.enum';
import { Role } from './role.enum';
import { Experience, ExperienceSchema } from './experience.schema';
import { Calendar, CalendarSchema } from './calendar.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  uidFireBase: string 

  @Prop({ unique: true, required: true,
    match: [/\S+@\S+\.\S+/, 'Email should be a valid email address']
  })
  email: string;

  @Prop({ required: true })
  isWizard: boolean;

  @Prop({ type: [String], enum: Language, default: [] })
  languages: Language[];

  @Prop({ type: [String], enum: Subject, default: [] })
  subjects: Subject[];

  @Prop({ type: ExperienceSchema, default: {} })
  experience: Experience;

  @Prop({ default: "https://www.intervinilo.com/images/stories/virtuemart/product/Bruja-003.jpg" })
  image: string;

  @Prop({ default: 5})
  reviews: number;

  @Prop({ default: 0})
  pricePerOne: number;

  @Prop({ default: 0})
  pricePerTwo: number;

  @Prop({ default: 0})
  pricePerThree: number;

  @Prop({ default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})
  aboutMe: string;

  @Prop({ default: false })
  isDisabled: boolean;

  @Prop({ type: [String], enum: Role, default: ["user"] }) 
  role: string;

  @Prop({ type: Calendar })
  calendar: Calendar;
}

export const UserSchema = SchemaFactory.createForClass(User);
