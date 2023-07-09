import { ObjectId } from 'mongoose';
import { UserSystemState } from '../enums/user-system-state.enum';

export class GetUserOutput {
  _id: ObjectId;
  name: string;
  email: string;
  systemState: UserSystemState;

  constructor(_id, name, email, systemState?) {
    (this._id = _id),
      (this.name = name),
      (this.email = email),
      (this.systemState = systemState);
  }
}
