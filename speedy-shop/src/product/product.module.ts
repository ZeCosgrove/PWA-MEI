import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './schemas/product.schema';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';
import {
  ShopLayout,
  ShopLayoutSchema,
} from 'src/shop-layout/schemas/shopping-layout.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';

import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: ShopLayout.name, schema: ShopLayoutSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [ProductService],
})
export class ProductModule {}
