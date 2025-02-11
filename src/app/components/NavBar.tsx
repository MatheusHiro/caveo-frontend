import { useCartStore } from "../hooks/useCartStore"
import { FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
    const cartQuantity = useCartStore((state) => state.cart.reduce((total, item) => total + item.quantity, 0));
    return (
        <div className="fixed w-full top-0 left-0 bg-white z-50">
            <div className="flex items-center justify-between px-[4rem] py-[1rem]">
                <a href="/" className="font-semibold">
                    <div className="flex items-center text-xl">
                        Shop
                    </div>
                </a>
                <a href="/cart">
                    <button

                        className="rounded-full border border-black outline-solid w-[3rem] h-[3rem] relative"
                    >
                        <FaShoppingCart className="mx-auto" />

                        {cartQuantity > 0 && (

                            <div
                                className="rounded-full bg-black flex justify-center items-center"
                                style={{
                                    color: "white",
                                    width: "1.5rem",
                                    height: "1.5rem",
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    transform: "translate(25%, 25%)",
                                }}
                            >
                                {cartQuantity}
                            </div>
                        )}

                    </button>
                </a>
            </div>
        </div>
    )
}