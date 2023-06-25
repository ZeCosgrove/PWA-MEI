import { ShopLayout } from 'src/shop-layout/entities/shop-layout.entity'
import { ProductSystemState } from '../enums/product-system-state.enum'
import { Category } from 'src/category/entities/category.entity'

export class Product {
    name: string
    description: string
    price: string
    quantity: number
    category: Category
    location: number
    shop: ShopLayout
    systemState: ProductSystemState
    weeklyProduct: Boolean
    highlight: Boolean
}
