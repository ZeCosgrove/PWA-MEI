import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

@Schema({ timestamps: true })
export class CartProduct extends Document{
    @Prop()
    product: Product

    @Prop()
    quantity: number

    @Prop()
    discount: number

}