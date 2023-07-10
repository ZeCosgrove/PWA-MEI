import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from '../../address/entities/address.entity';
import { UserSystemState } from '../enums/user-system-state.enum';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  androidToken: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  role: UserRole;

  @ApiProperty()
  @Prop()
  nif: number;

  @ApiProperty()
  @Prop()
  mobile: number;

  @ApiProperty()
  @Prop()
  address: Address;

  @ApiProperty()
  @Prop()
  systemState: UserSystemState;
}

export const UserSchema = SchemaFactory.createForClass(User);
