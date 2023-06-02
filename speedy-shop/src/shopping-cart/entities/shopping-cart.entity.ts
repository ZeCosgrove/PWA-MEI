import { User } from '../../user/entities/user.entity'
import { Product } from '../../product/entities/product.entity'
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum'

export class ShoppingCart {
    user: User
    products: Array<Product>[]
    startDate: Date
    endDate: Date
    systemState: ShoppingCartSystemState
}