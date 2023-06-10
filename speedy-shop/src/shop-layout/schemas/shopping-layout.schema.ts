import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Layout } from "../entities/layout.entity"
import { ShopLayoutSystemState } from '../enums/shop-layout-system-state.enum';

@Schema({timestamps: true})
export class ShopLayout extends Document{
  @Prop()
  name: string;

  @Prop()
  layout: Layout;

  @Prop()
  systemState: ShopLayoutSystemState;

  @Prop()
  realWorldCoordinates: [number, number]
}

export const ShopLayoutSchema = SchemaFactory.createForClass(ShopLayout);