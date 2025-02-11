import { FaMinus, FaPlus } from "react-icons/fa"
import { CartItem } from "../hooks/useCartStore"
import { useState } from "react"

interface QuantitySelectorProps {
    item: CartItem;
    onQuantityChange: (newQuantity: number) => void;
    className?: string
}

export default function QuantitySelector({ item, onQuantityChange, className }: QuantitySelectorProps) {

    const [quantity, setQuantity] = useState<number>(item.quantity)

    function addOne() {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    }

    function removeOne() {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    }

    return (
        <div className={`rounded-full flex items-center justify-between text-sm text-center py-1 px-2 ${className ? className : ''}`}>
            <button onClick={removeOne} disabled={quantity === 1}>
                <FaMinus />
            </button>
            {quantity}
            <button onClick={() => addOne()}>
                <FaPlus className="text-sm" />
            </button>
        </div>
    )
}