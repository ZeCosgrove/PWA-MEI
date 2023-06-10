import { Module } from '@nestjs/common';
import { ProductLocationService } from './product-location.service';
import { ProductLocationController } from './product-location.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {ProductLocation, ProductLocationSchema} from './schemas/product-location.schema';
import { ProductSchema, Product } from 'src/product/schemas/product.schema';
import { ShopLayout, ShopLayoutSchema } from 'src/shop-layout/schemas/shopping-layout.schema';

@Module({
  controllers: [ProductLocationController],
  providers: [ProductLocationService],
  imports: [MongooseModule.forFeature([
    { name: ProductLocation.name, schema: ProductLocationSchema },
    { name: Product.name, schema: ProductSchema},
    { name: ShopLayout.name, schema: ShopLayoutSchema}
  ])]
})
export class ProductLocationModule {}
