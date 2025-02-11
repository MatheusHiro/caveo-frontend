'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../hooks/useCartStore';
import { fetchProduct } from '@/app/domain/api/products';
import { ProductItem } from '@/app/domain/types/product';
import RatingGroup from '@/app/components/RatingGroup';
import QuantitySelector from '@/app/components/QuantitySelector';
import { FaCartPlus } from 'react-icons/fa';
import Image from 'next/image';

export default function ProductPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [product, setProduct] = useState<ProductItem | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);
    const [quantity, setQuantity] = useState<number>(1)

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;

            try {
                const data = await fetchProduct(id);
                setProduct(data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };

        loadProduct();
    }, [id]);

    if (!product) return <p className="text-center mt-10 text-lg text-gray-500">Carregando...</p>;

    const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
    }

    return (
        <div className="container mt-10 mx-auto px-4 py-10 flex items-center justify-center min-h-screen">
            <div className="grid mx-10 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={320}
                        height={320}
                        className="object-contain sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 border rounded-lg shadow-sm"
                    />
                </div>

                <div className="text-left space-y-4">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    <p className="text-gray-700">{product.description}</p>
                    <RatingGroup rating={product.rating} />
                    <p className="text-xl font-bold text-green-600">R$ {product.price}</p>
                    <div className='flex items-center space-x-[2rem]'>
                        <QuantitySelector item={cartItem} onQuantityChange={(newQuantity) => setQuantity(newQuantity)} className='w-[8rem]' />
                        <button
                            onClick={() => addToCart(cartItem, quantity)}
                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 shadow-md"
                        >
                            <FaCartPlus />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

