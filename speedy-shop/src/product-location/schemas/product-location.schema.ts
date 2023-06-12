import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';
import { ShopLayout } from '../../shop-layout/schemas/shopping-layout.schema';

@Schema({timestamps: true})
export class ProductLocation extends Document{
  @Prop()
  product: Product;

  @Prop()
  shop: ShopLayout;

  @Prop()
  location: number;
}

export const ProductLocationSchema = SchemaFactory.createForClass(ProductLocation);