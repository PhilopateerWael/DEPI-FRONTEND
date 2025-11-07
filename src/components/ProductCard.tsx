import { Heart } from "lucide-react";
import type { TProduct } from "../Types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }: { product: TProduct }) => {
    const favorites = useSelector((state : RootState) => state.favorites)
    const [favorited, setFavorited] = useState(favorites.includes(product._id));
    const dispatch = useDispatch()

    function toggleFavorite(e : React.MouseEvent){
        e.stopPropagation()
        if(favorited){
            dispatch(removeFavorite(product._id))
        }else{
            dispatch(addFavorite(product._id))
        }
        setFavorited(!favorited)
    }
    
    const navigate = useNavigate()

    return (
        <div className="border rounded-xl shadow-sm bg-white p-4 cursor-pointer relative" onClick={() => navigate("/product/" + product._id)}>
            <button className="absolute top-3 right-3 bg-white/80  shadow-sm w-10 h-10 text-red-500 hover:bg-red-500 rounded-full p-1 flex justify-center items-center cursor-pointer hover:text-white" onClick={toggleFavorite}>
                <Heart size={20} className={" " + (favorited ? "fill-current" : "stroke-current")} />
            </button>
            <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 rounded-lg mb-3 object-contain"
            />
            <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
            <p className="text-red-500 font-medium text-md mt-1">${product.price}</p>
        </div>
    );
};