import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class ShopLayout extends Document{
  @Prop()
  name: string;

  @Prop()
  layout: number;

  @Prop()
  systemState: number;
}

export const ShopLayoutSchema = SchemaFactory.createForClass(ShopLayout);