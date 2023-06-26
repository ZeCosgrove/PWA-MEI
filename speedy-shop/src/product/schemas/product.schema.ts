import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductSystemState } from '../enums/product-system-state.enum';
import { Category } from 'src/category/schemas/category.schema';
import { ShopLayout } from 'src/shop-layout/schemas/shopping-layout.schema';


@Schema({timestamps: true})
export class Product extends Document{
  @Prop()
  image: Buffer;

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

  @Prop()
  shop: ShopLayout

  @Prop()
  weeklyProduct: Boolean

  @Prop()
  highlight: Boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product);