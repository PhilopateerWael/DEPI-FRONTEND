import OrderCard from "./OrderCard";

const OrdersTab = ({
    orders,
    onView,
}: {
    orders: any[];
    onView: (id: string) => void;
}) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-sm:p-3">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">My Orders</h2>

            {!orders.length ? (
                <p className="text-gray-500">You haven’t placed any orders yet.</p>
            ) : (
                <div className="flex flex-col-reverse gap-4">
                    {orders.map((order, index) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            index={index}
                            onView={onView}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersTab;
