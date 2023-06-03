import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/entities/user.entity'

@Schema({timestamps: true})
export class ShoppingCart extends Document{
  @Prop()
  user: User;

  @Prop()
  product: Array<number>;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  systemState: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);