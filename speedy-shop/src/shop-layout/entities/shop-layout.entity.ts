import { Layout } from "./layout.entity"
import { ShopLayoutSystemState } from '../enums/shop-layout-system-state.enum'

export class ShopLayout {
    name: string
    layout: Layout
    realWorldCoordinates: Array<number>[]
    systemState: ShopLayoutSystemState
}
