import OrderCard from "./OrderCard";

const OrdersTab = ({
    orders,
    onView,
}: {
    orders: any[];
    onView: (id: string) => void;
}) => {
    return (
        <div className="bg-white rounded-2xl">

            {!orders.length ? (
                <p className="text-gray-500 text-center py-6">
                    You haven’t placed any orders yet.
                </p>
            ) : (
                <div className="flex flex-col-reverse gap-4">
                    {orders.map((order, index) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            index={orders.length - index} // Show 1-based numbering
                            onView={onView}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersTab;
