import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Product } from 'src/product/schemas/product.schema';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { CartProduct } from 'src/cart-product/schemas/cart-product.schema';

@Schema({ timestamps: true })
export class ShoppingCart extends Document {
  @Prop()
  user: User;

  @Prop()
  products: Array<CartProduct>;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  systemState: ShoppingCartSystemState;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
