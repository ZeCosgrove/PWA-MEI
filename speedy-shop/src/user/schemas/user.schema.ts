import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from 'src/address/entities/address.entity';
import { UserSystemState } from '../enums/user-system-state.enum';
import { UserRole } from '../enums/user-role.enum';

@Schema({timestamps: true})
export class User extends Document{
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: UserRole;

  @Prop()
  nif: number;

  @Prop()
  mobile: number;

  @Prop()
  address: Address;

  @Prop()
  systemState: UserSystemState;
}

export const UserSchema = SchemaFactory.createForClass(User);