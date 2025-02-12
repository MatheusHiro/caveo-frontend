import api from "../api/products";
import { ProductItem } from "../types/product";

export const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const allProducts = await api.get<ProductItem[]>('/products');

    const perPage = 8;
    const start = (pageParam - 1) * perPage;
    const end = start + perPage;

    return {
        products: allProducts.data.slice(start, end),
        nextPage: end < allProducts.data.length ? pageParam + 1 : null,
    };
};

export async function fetchProduct(id: string): Promise<ProductItem> {
    const response = await api.get<ProductItem>(`/products/${id}`);
    return response.data;
}