import { User } from '../../user/entities/user.entity'
import { Product } from '../../product/entities/product.entity'
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum'
import { CartProduct } from 'src/cart-product/entities/cart-product.entity'

export class ShoppingCart {
    user: User
    products: Array<CartProduct>[]
    startDate: Date
    endDate: Date
    systemState: ShoppingCartSystemState
}