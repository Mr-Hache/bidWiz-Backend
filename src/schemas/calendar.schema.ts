import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarDocument = Calendar & Document;

@Schema()
export class TimeSlot {
  @Prop({ default: false })
  isBooked: boolean;

  @Prop({default: ""})
  detailClass: string;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);

@Schema()
export class Day {
  @Prop({ type: Map, of: TimeSlotSchema })
  timeSlots: Map<string, TimeSlot>;
}

export const DaySchema = SchemaFactory.createForClass(Day);

@Schema()
export class Calendar {
  @Prop({ type: Map, of: DaySchema })
  days: Map<string, Day>;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
