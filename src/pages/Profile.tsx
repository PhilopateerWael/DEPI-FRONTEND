import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import ProfileTab from "../components/ProfileTab";
import OrdersTab from "../components/OrdersTab";;
import OrderModal from "../components/OrderModal";

const Profile = () => {
    const [tab, setTab] = useState<"profile" | "orders">("profile");
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const { user } = useSelector((s: RootState) => s.auth);
    const orders = useSelector((s: RootState) => s.orders);

    if (!user) return null;

    const selectedOrder = orders.find((o) => o._id === selectedOrderId) || null;

    return (
        <div className="max-w-7xl mx-auto px-6 max-sm:px-2 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">My Account</h1>
            <p className="text-gray-500 mb-6">Manage your account and view your orders</p>

            <div className="flex gap-4 border-b border-gray-200 pb-2">
                {["profile", "orders"].map((name) => (
                    <button
                        key={name}
                        onClick={() => setTab(name as "profile" | "orders")}
                        className={`px-4 py-2 rounded-t-lg font-medium capitalize transition cursor-pointer
                    ${tab === name
                                ? "bg-white border-x border-t border-gray-200 shadow-sm text-gray-900"
                                : "text-gray-500 hover:text-gray-700"}
                `}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {tab === "profile" && <ProfileTab user={user} />}
                {tab === "orders" && (
                    <OrdersTab orders={orders} onView={(id) => setSelectedOrderId(id)} />
                )}
            </div>

            {selectedOrder && (
                <OrderModal order={selectedOrder} onClose={() => setSelectedOrderId(null)} />
            )}
        </div>

    );
};

export default Profile;
