import { ProductLocation } from 'src/product-location/entities/product-location.entity'
import { ProductSystemState } from '../enums/product-system-state.enum'
import { Category } from 'src/category/entities/category.entity'

export class Product {
    name: string
    description: string
    price: string
    quantity: number
    category: Category
    location: number
    systemState: ProductSystemState
}
