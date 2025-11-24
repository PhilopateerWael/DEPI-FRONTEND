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
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative max-h-[90svh] overflow-y-scroll">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                    Order Info
                </h2>

                {order.message && (
                    <div className="mb-4 p-3 bg-gray-100 rounded-lg text-gray-700 text-sm whitespace-pre-wrap wrap-break-word">
                        {order.message}
                    </div>
                )}

                <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                    {order.products.map((p: any) => (
                        <div
                            key={p.productId}
                            className="flex items-center gap-3 border-b border-gray-200 pb-2"
                        >
                            <img
                                src={p.img}
                                alt={p.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                                <p className="font-medium text-gray-800">
                                    {p.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ${p.price} × {p.quantity} = $
                                    {(p.price * p.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 space-y-1 text-gray-800">

                        <div className="flex justify-between text-md">
                            <span>Subtotal:</span>
                            <span>${order.totalPrice.toFixed(2)}</span>
                        </div>

                        {order.usedPoints > 0 && (
                            <div className="flex justify-between text-md text-green-600 font-medium">
                                <span>Discount ({order.usedPoints} pts):</span>
                                <span>- ${discount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-lg font-semibold border-t pt-2 mt-2">
                            <span>Final Total:</span>
                            <span>${(order.totalPrice - discount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
