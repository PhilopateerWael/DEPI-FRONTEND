import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Profile = () => {
    const [tab, setTab] = useState<"profile" | "orders">("profile");
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    const { user } = useSelector((s: RootState) => s.auth);
    const orders = useSelector((s: RootState) => s.orders);

    if (!user) return null;

    const orderToView = selectedOrder
        ? orders.find((o) => o._id === selectedOrder)
        : null;

    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-semibold mb-8 ">My Account</h1>

            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2">
                {["profile", "orders"].map((name) => (
                    <button
                        key={name}
                        onClick={() => setTab(name as "profile" | "orders")}
                        className={`px-4 py-2 rounded-lg cursor-pointer capitalize}`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="mt-6">
                {/* PROFILE TAB */}
                {tab === "profile" && (
                    <div className="shadow-md rounded-xl p-6 max-w-7xl">
                        <h2 className="text-xl font-semibold mb-4 ">
                            Profile Details
                        </h2>

                        <form className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm mb-1 ">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user.username}
                                    className="border rounded-lg px-3 py-2 w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 ">Email</label>
                                <input
                                    type="email"
                                    defaultValue={user.email}
                                    disabled
                                    className="border rounded-lg px-3 py-2 w-full bg-gray-100 text-gray-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="border rounded-xl py-3 cursor-pointer mt-2"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}

                {/* ORDERS TAB */}
                {tab === "orders" && (
                    <div className="shadow-md rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4 ">My Orders</h2>

                        {!orders?.length ? (
                            <p className="text-gray-500">No orders yet.</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {orders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm"
                                    >
                                        <div>
                                            <p className="font-medium ">
                                                Order #{order._id.slice(-5)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Status: {order.status}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Total: ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order._id)}
                                                className="bg-rose-100  hover:bg-rose-200 rounded-lg px-4 py-2 cursor-pointer"
                                            >
                                                View
                                            </button>
                                            {order.status === "pending" && (
                                                <a
                                                    href={order.payUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-4 py-2 cursor-pointer"
                                                >
                                                    Checkout
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* MODAL */}
            {orderToView && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 ">
                            Order #{orderToView._id.slice(-5)}
                        </h2>

                        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                            {orderToView.products.map((p) => (
                                <div
                                    key={p.productId}
                                    className="flex items-center gap-3 border-b pb-2"
                                >
                                    <img
                                        src={p.img}
                                        alt={p.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-medium">{p.name}</p>
                                        <p className="text-sm text-gray-600">
                                            ${p.price} x {p.quantity} = ${(p.price * p.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between font-medium">
                                <span>Total:</span>
                                <span>${orderToView.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
