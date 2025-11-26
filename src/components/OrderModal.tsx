const OrderModal = ({
    order,
    onClose,
}: {
    order: any;
    onClose: () => void;
}) => {
    const discount = (order.usedPoints || 0) * 0.1;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl max-h-[90svh] overflow-y-auto relative">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Order Details
                </h2>

                {order.message && (
                    <div className="mb-4 p-3 bg-gray-100 rounded-lg text-gray-700 text-sm whitespace-pre-wrap break-words">
                        {order.message}
                    </div>
                )}

                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                    {order.products.map((p: any) => (
                        <div
                            key={p.productId}
                            className="flex items-center gap-3 border-b border-gray-200 pb-2 last:border-none"
                        >
                            <img
                                src={p.img}
                                alt={p.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex flex-col min-w-0">
                                <p className="font-semibold text-gray-900 truncate">
                                    {p.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    ${p.price} × {p.quantity} = $
                                    {(p.price * p.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 space-y-2 text-gray-800">
                    <div className="flex justify-between text-base">
                        <span>Subtotal</span>
                        <span>${order.totalPrice.toFixed(2)}</span>
                    </div>

                    {order.usedPoints > 0 && (
                        <div className="flex justify-between text-base text-green-600 font-medium">
                            <span>Discount ({order.usedPoints} pts)</span>
                            <span>- ${discount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>${(order.totalPrice - discount).toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold text-gray-800 cursor-pointer transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
