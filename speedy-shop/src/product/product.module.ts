import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {Product, ProductSchema} from './schemas/product.schema';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';

import { JwtModule } from '@nestjs/jwt';
import { ShopLayout, ShopLayoutSchema } from 'src/shop-layout/schemas/shopping-layout.schema';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [ 
    MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Category.name, schema: CategorySchema},
    { name: ShopLayout.name, schema: ShopLayoutSchema}
  ]), 
  JwtModule.register({
    global: true,
    secret: "asasd", //process.env.SECRET,
    signOptions: { expiresIn: '3600s' },
  })],
  exports: [ProductService]
})
export class ProductModule {}
