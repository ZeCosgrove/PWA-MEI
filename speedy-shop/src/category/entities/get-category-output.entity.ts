import { ObjectId } from "mongoose"

export class GetCategoryOutput {
    _id: ObjectId
    name: string
    
    constructor(_id, name) {
        this._id = _id,
        this.name = name
    }
}