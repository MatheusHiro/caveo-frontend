'use client'

import Image from 'next/image';
import CartSelector from '../components/CartSelector';
import { useCartStore } from '../hooks/useCartStore';
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Link from 'next/link';

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCartStore();

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">🛒 Seu Carrinho</h1>

            {cart.length === 0 ? (
                <div className="text-center text-gray-500">
                    <FaShoppingCart className="text-6xl mx-auto mb-4" />
                    <p className="text-lg">Seu carrinho está vazio.</p>
                </div>
            ) : (
                <div className="w-full max-w-3xl space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-white p-4 border rounded-lg shadow-md"
                        >
                            <div className='w-20 h-20 ' >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="max-h-full max-w-full object-cover rounded-lg border"
                                />
                            </div>


                            <div className="flex-1 px-4">
                                <Link href={`products/${item.id}`}>
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                </Link>
                                <p className="text-gray-600">Preço: <span className="font-medium text-green-600">${item.price}</span></p>
                                <p className="text-gray-600">Quantidade: <CartSelector item={item} /></p>

                                <p>Total: <span className="font-semibold">{item.quantity * item.price}</span></p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-lg transition-all duration-200"
                            >
                                <FaTrash className="text-xl" />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-200"
                    >
                        🗑️ Limpar Carrinho
                    </button>
                </div>
            )}
        </div>
    );
}
