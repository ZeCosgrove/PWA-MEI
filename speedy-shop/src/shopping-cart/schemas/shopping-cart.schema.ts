import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Product } from 'src/product/schemas/product.schema';

@Schema({ timestamps: true })
export class ShoppingCart extends Document {
  @Prop()
  user: User;

  @Prop()
  products: Array<Product>;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  systemState: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
