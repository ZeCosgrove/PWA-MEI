import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class ShoppingCart extends Document{
  @Prop()
  user: object;

  @Prop()
  product: Array<object>;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  systemState: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);