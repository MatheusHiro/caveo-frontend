import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { CartItem, useCartStore } from "../hooks/useCartStore";

interface CartSelectorProps {
    item: CartItem
}

export default function CartSelector({ item }: CartSelectorProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const removeOneFromCart = useCartStore((state) => state.removeOneFromCart)

    return (
        <div className="rounded-full flex items-center justify-between text-sm text-center w-20 border-gray-400 border-2 py-1 px-2">
            <button onClick={() => removeOneFromCart({ ...item })}>
                {
                    item.quantity > 1 ? (
                        <FaMinus />
                    ) :
                        <FaTrash className="text-sm" />
                }
            </button>

            {item.quantity}
            <button onClick={() => addToCart({ ...item })}>
                <FaPlus className="text-sm" />
            </button>
        </div>
    )
}