import { ObjectId } from "mongoose"

export class GetUserOutput {
    _id: ObjectId
    name: string
    email: string
    
    constructor(_id, name, email) {
        this._id = _id,
        this.name = name,
        this.email = email
    }
}