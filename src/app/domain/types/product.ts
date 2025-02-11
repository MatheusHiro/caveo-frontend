import { Rating } from "./rating";

export interface ProductItem {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: Rating,
    title: string
}