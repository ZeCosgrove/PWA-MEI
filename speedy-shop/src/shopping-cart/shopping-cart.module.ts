import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {ShoppingCart, ShoppingCartSchema} from './schemas/shopping-cart.schema';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  imports: [MongooseModule.forFeature([
    { name: ShoppingCart.name, schema: ShoppingCartSchema }
  ])]
})
export class ShoppingCartModule {}
