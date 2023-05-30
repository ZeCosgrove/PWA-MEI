import { Module } from '@nestjs/common';
import { ProductLocationService } from './product-location.service';
import { ProductLocationController } from './product-location.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {ProductLocation, ProductLocationSchema} from './schemas/product-location.schema';

@Module({
  controllers: [ProductLocationController],
  providers: [ProductLocationService],
  imports: [MongooseModule.forFeature([
    { name: ProductLocation.name, schema: ProductLocationSchema }
  ])]
})
export class ProductLocationModule {}
