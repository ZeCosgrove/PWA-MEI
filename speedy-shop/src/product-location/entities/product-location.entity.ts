import { Product } from '../../product/entities/product.entity'
import { ShopLayout } from '../../shop-layout/entities/shop-layout.entity'

export class ProductLocation {
    product: Product
    shop: ShopLayout
    location: [number, number]
}
