import { ObjectId } from 'mongoose';

export class CreateUserOutput {
  _id: ObjectId;
  name: string;
  email: string;
  token: string;
  expiresIn: string;

  constructor(_id, name, email, token?, expiresIn?) {
    (this._id = _id), (this.name = name), (this.email = email);
    this.token = token;
    this.expiresIn = expiresIn;
  }
}
