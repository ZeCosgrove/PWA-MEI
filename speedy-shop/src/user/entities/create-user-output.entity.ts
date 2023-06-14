import { ObjectId } from "mongoose"

export class CreateUserOutput {
    _id: ObjectId
    name: string
    email: string
    token: string
    
    constructor(_id, name, email, token?) {
        this._id = _id,
        this.name = name,
        this.email = email
        this.token = token
    }
}