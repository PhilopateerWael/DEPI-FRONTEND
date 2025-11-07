import { X, Plus, Minus } from "lucide-react";
import type { TProduct } from "../Types";

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
    return (
        <div className="w-full flex items-center justify-between bg-white border rounded-xl p-3 shadow-sm max-sm:text-sm">
            <div className="flex gap-3 items-center min-w-0">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-lg shrink-0"
                />

                <div className="flex flex-col min-w-0">
                    <p className="font-semibold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] sm:max-w-[220px]">
                        {product.name}
                    </p>

                    <p className="text-red-500 font-medium text-sm">
                        ${product.price} × {quantity} = 
                        <br className="sm:hidden"/>
                        {" "}${(product.price * quantity).toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <button
                        className="text-gray-600 hover:text-black cursor-pointer"
                        onClick={() =>  quantity > 1 ? onDecrease(product._id) : null }
                    >
                        <Minus size={16} />
                    </button>

                    <span className="font-medium w-6 text-center">{quantity}</span>

                    <button
                        className="text-gray-600 hover:text-black cursor-pointer"
                        onClick={() => quantity < product.stock ? onIncrease(product._id) : null}
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <button
                    onClick={() => onRemove(product._id)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};
