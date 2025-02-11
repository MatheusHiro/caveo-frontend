'use client'
import { ProductItem } from "../domain/types/product"
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
import { useCartStore } from "../hooks/useCartStore";
import RatingGroup from "./RatingGroup";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
    product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [quantity, setQuantity] = useState<number>(1)

    const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
    }
    const addToCart = useCartStore((state) => state.addToCart);
    const [isHovered, setIsHovered] = useState(false);

    function resetQuantity() {
        setIsHovered(false)
        setQuantity(1)
    }

    return (
        <div
            key={product.id}
            className="flex flex-col border p-4 rounded-lg shadow-md h-full space-y-[1rem]"
            onMouseLeave={() => resetQuantity()}

        >
            <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
                <div className="w-full h-40 md:h-48 flex justify-center items-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={320}
                        height={180}
                        className="object-contain max-w-full max-h-full"
                    />
                </div>


                <p className="mt-2 font-semibold">{product.title}</p>
            </Link>

            <div className="flex justify-between items-end mt-auto">
                <div>
                    <p className="text-gray-600">${product.price}</p>
                    <RatingGroup rating={product.rating} />
                </div>

                {isHovered ?
                    <></>
                    :
                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        <FaShoppingCart />
                    </button>
                }

            </div>
            {isHovered ?
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => resetQuantity()}
                    className="relative flex items-center"
                >
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex items-center bg-white rounded-lg px-4 py-2 w-full justify-between border border-gray-200"
                    >
                        <QuantitySelector item={cartItem} onQuantityChange={(newQuantity) => setQuantity(newQuantity)} className="w-[5rem]" />
                        <button
                            onClick={() => addToCart(cartItem, quantity)}
                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 shadow-md"
                        >
                            <FaCartPlus />
                        </button>
                    </motion.div>
                </div>
                :
                <>
                </>
            }
        </div>
    );
}
