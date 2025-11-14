const OrderCard = ({
    order,
    index,
    onView,
}: {
    order: any;
    index: number;
    onView: (id: string) => void;
}) => {
    const statusColor =
        order.status === "pending"
            ? "text-yellow-600"
            : order.status === "canceled"
            ? "text-red-600"
            : "text-green-600";

    return (
        <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-white shadow-sm">
            <div>
                <p className="font-medium text-gray-800">Order #{index}</p>
                <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className={`font-medium ${statusColor}`}>
                        {order.status}
                    </span>
                </p>
                <p className="text-sm text-gray-500">
                    Total: ${order.totalPrice.toFixed(2)}
                </p>
            </div>

            <div className="flex gap-2 max-sm:flex-col max-sm:text-xs">
                <button
                    onClick={() => onView(order._id)}
                    className="bg-rose-100 hover:bg-rose-200 rounded-lg px-4 py-2 cursor-pointer"
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
    );
};

export default OrderCard;
