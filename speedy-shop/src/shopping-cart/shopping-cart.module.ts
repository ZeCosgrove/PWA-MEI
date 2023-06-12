import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {ShoppingCart, ShoppingCartSchema} from './schemas/shopping-cart.schema';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
})
export class ShoppingCartModule {}
