import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class ProductLocation extends Document{
  @Prop()
  product: object;

  @Prop()
  shop: object;

  @Prop()
  location: number;
}

export const ProductLocationSchema = SchemaFactory.createForClass(ProductLocation);