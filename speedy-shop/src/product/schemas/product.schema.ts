import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Product extends Document{
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  category: number;

  @Prop()
  systemState: number;

  @Prop()
  location: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);