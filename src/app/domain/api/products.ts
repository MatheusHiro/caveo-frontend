import axios, { Axios } from "axios";
import { ProductItem } from "../types/product";

const API_URL = "https://fakestoreapi.com/";

const api = axios.create({
    baseURL: API_URL,
})

export default api



export async function fetchProduct(id: string): Promise<ProductItem> {
    const response = await axios.get<ProductItem>(`${API_URL}/${id}`);
    return response.data;
}