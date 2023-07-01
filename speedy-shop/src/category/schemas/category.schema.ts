import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Category extends Document{
  @Prop({default: null, type: Buffer})
  image: Buffer;

  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);