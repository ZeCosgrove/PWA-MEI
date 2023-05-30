import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Help extends Document{
  @Prop()
  message: string;

  @Prop()
  date: Date;

  @Prop()
  sender: object;

  @Prop()
  receiver: object;

  @Prop()
  systemState: number;
}

export const HelpSchema = SchemaFactory.createForClass(Help);