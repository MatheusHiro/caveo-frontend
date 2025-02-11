import axios from "axios";
import { ProductItem } from "../types/product";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const allProducts = await axios.get<ProductItem[]>('https://fakestoreapi.com/products');

    const perPage = 8;
    const start = (pageParam - 1) * perPage;
    const end = start + perPage;

    return {
        products: allProducts.data.slice(start, end),
        nextPage: end < allProducts.data.length ? pageParam + 1 : null,
    };
};

export async function fetchProduct(id: string): Promise<ProductItem> {
    const response = await axios.get<ProductItem>(`https://fakestoreapi.com/products/${id}`);
    return response.data;
}