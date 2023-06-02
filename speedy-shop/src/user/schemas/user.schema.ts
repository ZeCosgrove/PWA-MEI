import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class User extends Document{
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: number;

  @Prop()
  nif: number;

  @Prop()
  mobile: number;

  @Prop()
  addresses: Array<object>;

  @Prop()
  systemState: number;
}

export const UserSchema = SchemaFactory.createForClass(User);