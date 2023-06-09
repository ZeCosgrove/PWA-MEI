import { ObjectId } from 'mongoose';
import { Layout } from './layout.entity';

export class GetShopLayoutOutput {
  _id: ObjectId;
  name: string;
  layout: Layout;
  realWorldCoordinates: [number, number];
  city: string;

  constructor(_id, name, layout, realWorldCoordinates, city?) {
    (this._id = _id),
      (this.name = name),
      (this.layout = layout),
      (this.realWorldCoordinates = realWorldCoordinates),
      (this.city = city);
  }
}
