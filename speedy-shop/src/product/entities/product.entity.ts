import { ProductSystemState } from '../enums/product-system-state.enum'

export class Product {
    name: string
    description: string
    price: string
    quantity: number
    category: number
    location: number
    systemState: ProductSystemState
}
