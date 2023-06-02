import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/entities/user.entity'

@Schema({timestamps: true})
export class Help extends Document{
  @Prop()
  subject: string;

  @Prop()
  message: string;

  @Prop()
  date: Date;

  @Prop()
  sender: User;

  @Prop()
  receiver: User;

  @Prop()
  systemState: number;
}

export const HelpSchema = SchemaFactory.createForClass(Help);