import { Module } from '@nestjs/common';
import { ShopLayoutService } from './shop-layout.service';
import { ShopLayoutController } from './shop-layout.controller';

@Module({
  controllers: [ShopLayoutController],
  providers: [ShopLayoutService]
})
export class ShopLayoutModule {}
