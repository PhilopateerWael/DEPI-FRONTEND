import { X, Plus, Minus } from "lucide-react";
import type { TProduct } from "../Types";
import { useState } from "react";

export const CartProduct = ({
    product,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
}: {
    product: TProduct;
    quantity: number;
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
}) => {
    const [editableQty, setEditableQty] = useState(quantity);

    const handleBlur = () => {
        let value = Math.max(0, Math.min(product.stock, editableQty));
        setEditableQty(value);
        if (value > quantity) onIncrease(product._id);
        else if (value < quantity) onDecrease(product._id);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <div className="w-full flex items-center justify-between bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all max-sm:text-sm">
            <div className="flex gap-4 items-center min-w-0">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="flex flex-col min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] sm:max-w-[220px]">
                        {product.name}
                    </p>

                    <p className="text-red-500 font-medium text-sm mt-1">
                        ${product.price} × {quantity} = ${(
                            product.price * quantity
                        ).toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 border rounded-lg px-2 py-1 bg-gray-50">
                    <button
                        className="p-1 rounded-full hover:bg-gray-200 cursor-pointer transition"
                        onClick={() => {
                            if (editableQty > 0) {
                                setEditableQty(prev => prev - 1);
                                onDecrease(product._id);
                            }
                        }}
                    >
                        <Minus size={16} />
                    </button>

                    <input
                        type="number"
                        value={editableQty}
                        min={0}
                        max={product.stock}
                        onChange={e => setEditableQty(Math.max(1, Math.min(Math.floor(Number(e.target.value)), product.stock)))}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-12 text-center font-medium bg-gray-50 border rounded-lg py-1 focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <button
                        className="p-1 rounded-full hover:bg-gray-200 cursor-pointer transition"
                        onClick={() => {
                            if (editableQty < product.stock) {
                                setEditableQty(prev => prev + 1);
                                onIncrease(product._id);
                            }
                        }}
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <button
                    onClick={() => onRemove(product._id)}
                    className="p-1 rounded-full bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};
