import { ObjectId } from "mongoose"
import { Address } from '../../address/entities/address.entity'
import { UserSystemState } from "../enums/user-system-state.enum"

export class GetUserDetailsOutput {
    _id: ObjectId
    name: string
    email: string
    role: number
    nif: number
    mobile: number
    address: Address
    systemState: UserSystemState
    
    constructor(_id, name, email, role, nif, mobile, address, systemState) {
        this._id = _id,
        this.name = name,
        this.email = email
        this.role = role
        this.nif = nif
        this.mobile = mobile
        this.address = address
        this.systemState = systemState
    }
}