import { Heart } from "lucide-react";
import type { TProduct } from "../Types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }: { product: TProduct }) => {
    const favorites = useSelector((state: RootState) => state.favorites)
    const [favorited, setFavorited] = useState(favorites.includes(product._id));
    const dispatch = useDispatch()

    function toggleFavorite(e: React.MouseEvent) {
        e.stopPropagation()
        if (favorited) {
            dispatch(removeFavorite(product._id))
        } else {
            dispatch(addFavorite(product._id))
        }
        setFavorited(!favorited)
    }

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate("/product/" + product._id)}
            className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative cursor-pointer border border-gray-100"
        >
            <button
                onClick={toggleFavorite}
                className="absolute z-10 cursor-pointer  top-4 right-4 bg-white/70 backdrop-blur-md border border-gray-200 w-11 h-11 rounded-full flex items-center justify-center shadow-sm hover:bg-red-100 hover:text-white transition"
            >
                <Heart
                    size={20}
                    className={favorited ? "fill-current text-red-500" : "stroke-current"}
                />
            </button>

            <div className="w-full h-48 flex items-center justify-center mb-4">
                <img
                    src={product.img}
                    alt={product.name}
                    className="object-contain h-full transition group-hover:scale-105"
                />
            </div>

            <h3 className="font-semibold text-lg text-gray-800 truncate">
                {product.name}
            </h3>

            <p className="text-red-500 font-bold text-xl mt-2">
                ${product.price}
            </p>
        </div>
    );

};