import { product } from "./product.model"

export type cart = {
    product: product[],
    total?: number
}
