import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';;
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { HelpModule } from './help/help.module';
import { ProductModule } from './product/product.module';
import { ShopLayoutModule } from './shop-layout/shop-layout.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

//`mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.hhyizyw.mongodb.net/?retryWrites=true&w=majority`

@Module({
  imports: [
    AddressModule,
    CartProductModule,
    HelpModule,
    ProductModule,
    ShopLayoutModule,
    ShoppingCartModule,
    UserModule,
    CategoryModule,
    ConfigModule.forRoot({envFilePath: '.env'}),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.8704wbn.mongodb.net/?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
