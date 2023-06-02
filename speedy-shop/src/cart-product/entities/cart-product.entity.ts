import { Product } from '../../product/entities/product.entity'

export class CartProduct {
    product: Product
    quantity: number
    discount: number
}
