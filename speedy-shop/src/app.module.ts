import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';;
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { HelpModule } from './help/help.module';
import { ProductModule } from './product/product.module';
import { ProductLocationModule } from './product-location/product-location.module';
import { ShopLayoutModule } from './shop-layout/shop-layout.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.hhyizyw.mongodb.net/?retryWrites=true&w=majority`),
    ConfigModule.forRoot(),
    AddressModule,
    CartProductModule,
    HelpModule,
    ProductModule,
    ProductLocationModule,
    ShopLayoutModule,
    ShoppingCartModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
