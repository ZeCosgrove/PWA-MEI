import { Module } from '@nestjs/common';
import { ShopLayoutService } from './shop-layout.service';
import { ShopLayoutController } from './shop-layout.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {ShopLayout, ShopLayoutSchema} from './schemas/shopping-layout.schema';

@Module({
  controllers: [ShopLayoutController],
  providers: [ShopLayoutService],
  imports: [MongooseModule.forFeature([
    { name: ShopLayout.name, schema: ShopLayoutSchema }
  ])]
})
export class ShopLayoutModule {}
