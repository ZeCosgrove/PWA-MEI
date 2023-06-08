import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductSystemState } from '../enums/product-system-state.enum';

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
  systemState: ProductSystemState;

  @Prop()
  location: [number, number];
}

export const ProductSchema = SchemaFactory.createForClass(Product);