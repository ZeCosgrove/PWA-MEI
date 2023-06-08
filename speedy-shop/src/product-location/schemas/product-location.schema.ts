import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class ProductLocation extends Document{
  @Prop()
  product: string;

  @Prop()
  shop: string;

  @Prop()
  location: [number, number];
}

export const ProductLocationSchema = SchemaFactory.createForClass(ProductLocation);