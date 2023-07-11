import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ShoppingCart,
  ShoppingCartSchema,
} from './schemas/shopping-cart.schema';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class ShoppingCartModule {}
