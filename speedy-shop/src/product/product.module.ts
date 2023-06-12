import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {Product, ProductSchema} from './schemas/product.schema';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';
import { ProductLocation, ProductLocationSchema } from 'src/product-location/schemas/product-location.schema';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Category.name, schema: CategorySchema}
  ])],
  exports: [ProductService]
})
export class ProductModule {}
