import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import api from "../Api";

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
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">My Account</h1>
            <p className="text-gray-500 mb-6">Manage your account and view your orders</p>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 pb-2">
                {["profile", "orders"].map((name) => (
                    <button
                        key={name}
                        onClick={() => setTab(name as "profile" | "orders")}
                        className={`px-4 py-2 rounded-t-lg font-medium capitalize transition ${tab === name
                            ? "bg-white border-t border-l border-r border-gray-200 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="mt-6">
                {/* PROFILE TAB */}
                {tab === "profile" && (
                    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
                        <div>
                            <p className="text-gray-700"><span className="font-medium">Username:</span> {user.username}</p>
                            <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
                        </div>
                        <button
                            onClick={() => api.post("/auth/logout").then(() => location.href = "/")}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-5 py-3 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* ORDERS TAB */}
                {tab === "orders" && (
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">My Orders</h2>

                        {!orders?.length ? (
                            <p className="text-gray-500">You haven’t placed any orders yet.</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {orders.map((order, i) => (
                                    <div
                                        key={order._id}
                                        className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">Order #{i}</p>
                                            <p className="text-sm text-gray-500">Status: <span className={`font-medium ${order.status === 'pending' ? 'text-yellow-600' : order.status === 'canceled' ? 'text-red-600' : 'text-green-600'}`}>{order.status}</span></p>
                                            <p className="text-sm text-gray-500">Total: ${order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order._id)}
                                                className="bg-rose-100 hover:bg-rose-200 rounded-lg px-4 py-2 transition"
                                            >
                                                View
                                            </button>
                                            {order.status === "pending" && (
                                                <a
                                                    href={order.payUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-4 py-2 transition"
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

            {orderToView && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Order #{orderToView._id.slice(-5)}</h2>
                        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                            {orderToView.products.map((p) => (
                                <div key={p.productId} className="flex items-center gap-3 border-b border-gray-200 pb-2">
                                    <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div>
                                        <p className="font-medium text-gray-800">{p.name}</p>
                                        <p className="text-sm text-gray-500">${p.price} x {p.quantity} = ${(p.price * p.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between font-medium text-gray-800 mt-2">
                                <span>Total:</span>
                                <span>${orderToView.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
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
