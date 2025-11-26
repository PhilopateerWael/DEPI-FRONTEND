import { X } from "lucide-react";
import type { TProduct } from "../Types";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../store/slices/favoritesSlice";
import { useNavigate } from "react-router-dom";

export const WishlistProduct = ({ product }: { product: TProduct }) => {
    const dispatch = useDispatch()

    function handleRemove(e: React.MouseEvent) {
        e.stopPropagation();
        dispatch(removeFavorite(product._id))
    }

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate("/product/" + product._id)}
            className="w-full flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm 
                   cursor-pointer transition hover:shadow-md hover:border-gray-300"
        >
            <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="flex flex-col">
                    <p className="font-semibold text-gray-900 text-base">{product.name}</p>
                    <p className="text-red-500 font-semibold text-sm mt-1">
                        ${product.price}
                    </p>
                </div>
            </div>

            <button
                onClick={handleRemove}
                className="p-2 rounded-full bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 
                       transition cursor-pointer"
            >
                <X size={18} />
            </button>
        </div>
    );

};
