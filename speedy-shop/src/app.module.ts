import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';;
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { HelpModule } from './help/help.module';
import { ProductModule } from './product/product.module';
import { ProductLocationModule } from './product-location/product-location.module';
import { ShopLayoutModule } from './shop-layout/shop-layout.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://a18809:a18809a18809@cluster0.8704wbn.mongodb.net/?retryWrites=true&w=majority`),
    AddressModule,
    CartProductModule,
    HelpModule,
    ProductModule,
    ProductLocationModule,
    ShopLayoutModule,
    ShoppingCartModule,
    UserModule,
    CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
