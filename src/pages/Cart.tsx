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
    const auth = useSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState(0);

    // Clean cart if invalid
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

    // 1 point = 0.1$
    const discount = points * 0.1;

    const maxPoints = Math.min(auth.user?.loyaltyPoints || 0, total * 10);

    const finalTotal = Math.max(0, total - discount);

    const handleCheckout = () => {
        if (loading) return;
        setLoading(true);

        api.post("/products/checkout", {
            cart: cleanCart,
            points
        })
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
                    alert(e?.response?.data?.message);
                }
            });
    };

    return (
        <div className="max-w-7xl max-sm:px-2 mx-auto px-6 py-6 flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            <div className="flex flex-col gap-4 flex-1">
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
                <p className="text-gray-500 text-center mt-6 text-lg">
                    Your cart is empty.
                </p>
            )}

            {items.length > 0 && (
                <div className="mt-8 border-t pt-6 bg-gray-50 rounded-xl p-6 shadow-sm">

                    {/* Loyalty Points Input */}
                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-lg">
                            🎁 Use Loyalty Points
                        </label>

                        <input
                            type="number"
                            min={0}
                            max={maxPoints}
                            value={points}
                            onChange={(e) => {
                                const v = Number(e.target.value);
                                if (v <= maxPoints) setPoints(v);
                                if (v < 0) setPoints(0);
                            }}
                            className="border px-4 py-2 rounded-lg w-full text-lg focus:ring-2 focus:ring-black"
                        />

                        <p className="text-sm text-gray-600 mt-1">
                            Available: {auth.user?.loyaltyPoints || 0} pts · Max usable: {maxPoints}
                        </p>

                        {points > 0 && (
                            <p className="text-green-600 mt-1 font-medium">
                                You are saving ${(discount).toFixed(2)}
                            </p>
                        )}
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-lg">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {points > 0 && (
                            <div className="flex justify-between text-lg text-green-600 font-medium">
                                <span>Discount</span>
                                <span>- ${discount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-xl font-bold mt-4 border-t pt-3">
                            <span>Final Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        className={`cursor-pointer w-full bg-black text-white py-4 text-xl font-semibold rounded-xl transition
                            ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"}`}
                        onClick={handleCheckout}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : `Checkout for $${finalTotal.toFixed(2)}`}
                    </button>
                </div>
            )}
        </div>
    );
};
