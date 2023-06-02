import { UserSystemState } from '../enums/user-system-state.enum'
import { UserRole } from '../enums/user-role.enum'
import { Address } from '../../address/entities/address.entity'

export class User {
    name: string
    email: string
    password: string
    role: UserRole
    nif: number
    mobile: number
    addresses: Array<Address>
    systemState: UserSystemState
}
