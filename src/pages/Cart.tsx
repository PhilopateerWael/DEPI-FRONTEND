import { useState } from "react";
import { CartProduct } from "../components/CartProduct";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearCart, decQuantity, incQuantity, removeProduct, setCart } from "../store/slices/cartSlice";
import api from "../Api";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const products = useSelector((state: RootState) => state.products);

    const [loading, setLoading] = useState(false);

    const cleanCart = cart.filter(item =>
        products.find(p => p._id === item.productId && item.quantity <= p.stock)
    );

    if (cleanCart.length !== cart.length) {
        dispatch(setCart({ cart: cleanCart }));
    }

    const items = cleanCart.map(item => ({
        quantity: item.quantity,
        product: products.find(p => p._id === item.productId)!
    }));

    const increase = (id: string) => dispatch(incQuantity({ productId: id }));
    const decrease = (id: string) => dispatch(decQuantity({ productId: id }));
    const removeItem = (id: string) => dispatch(removeProduct({ productId: id }));

    const total = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

    const handleCheckout = () => {
        if (loading) return;
        setLoading(true);

        api.post("/products/checkout", { cart: cleanCart })
            .then(x => {
                dispatch(clearCart());
                location.href = x.data.url;
            })
            .catch(e => {
                setLoading(false);
                if (e?.response?.data?.ok) {
                    dispatch(setCart(e.response.data.ok));
                    for (const x of e.response.data.errors) {
                        alert("Error with product of ID : " + x.productId + " - " + x.message);
                    }
                } else {
                    alert("server error");
                }
            });
    };

    return (
        <div className="max-w-7xl max-sm:px-2 mx-auto px-6 py-6 flex flex-col h-full">
            <h1 className="text-2xl font-semibold mb-6">Cart</h1>

            <div className="flex flex-col gap-3 flex-1">
                {items.map(({ product, quantity }) => (
                    <CartProduct
                        key={product._id}
                        product={product}
                        quantity={quantity}
                        onIncrease={increase}
                        onDecrease={decrease}
                        onRemove={removeItem}
                    />
                ))}
            </div>

            {items.length === 0 && (
                <p className="text-gray-500 text-center mt-6">
                    Your cart is empty.
                </p>
            )}

            {items.length > 0 && (
                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold mb-4">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button
                        className={`cursor-pointer w-full bg-black text-white py-3 text-lg font-medium rounded-xl
                            ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"}`}
                        onClick={handleCheckout}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Checkout"}
                    </button>
                </div>
            )}
        </div>
    );
};
