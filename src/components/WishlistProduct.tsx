import { X } from "lucide-react";
import type { TProduct } from "../Types";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../store/slices/favoritesSlice";
import { useNavigate } from "react-router-dom";

export const WishlistProduct = ({ product }: { product: TProduct }) => {
    const dispatch = useDispatch()

    function handleRemove(e : React.MouseEvent){
        e.stopPropagation();    
        dispatch(removeFavorite(product._id))    
    }

    const navigate = useNavigate()

    return (
        <div className="w-full flex items-center justify-between bg-white border rounded-xl p-3 shadow-sm cursor-pointer" onClick={()=> navigate("/product/" + product._id)}>
            <div className="flex gap-3 items-center">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-lg"
                />

                <div className="flex flex-col">
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-red-500 font-medium text-sm">
                        ${product.price}
                    </p>
                </div>
            </div>

            <button
                onClick={handleRemove}
                className="text-gray-400 hover:text-red-500 cursor-pointer p-1 bg-gray-200 rounded-full"
            >
                <X size={20} />
            </button>
        </div>
    );
};
