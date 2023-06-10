import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductSystemState } from '../enums/product-system-state.enum';
import { Category } from 'src/category/schemas/category.schema';
import { ProductLocation } from 'src/product-location/schemas/product-location.schema';

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
  category: Category;

  @Prop()
  systemState: ProductSystemState;

  @Prop()
  location: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);