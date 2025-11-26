import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Heart } from "lucide-react";
import type { RootState } from "../store/store";
import { addProduct } from "../store/slices/cartSlice";
import ProductModal from "../components/ProductModal";

const ProductPage = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const isAdmin = auth.user?.isAdminstartor;

    const product = useSelector((state: RootState) =>
        state.products.find(p => p._id === id)
    );

    const favorites = useSelector((state: RootState) => state.favorites);

    const [quantity, setQuantity] = useState(0);
    const [favorited, setFavorited] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (product) setFavorited(favorites.includes(product._id));
    }, [product, favorites]);

    if (!product)
        return <div className="p-10 text-center text-lg">Product not found</div>;

    const handleAdd = () => {
        if (!auth.user) return navigate("/register")
        if (quantity > 0) {
            dispatch(addProduct({ productId: product._id, quantity: Math.floor(quantity) || 1 }))
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 1000);
        }
    };

    const toggleFavorite = () => {
        if (!product) return;
        if (favorited)
            dispatch({ type: "favorites/removeFavorite", payload: product._id });
        else
            dispatch({ type: "favorites/addFavorite", payload: product._id });
        setFavorited(!favorited);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-16">

            <div className="relative bg-white rounded-3xl p-8 shadow-xl flex justify-center items-center">
                <img
                    src={product.img}
                    alt={product.name}
                    className="object-contain h-[350px] md:h-[430px] transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">{product.name}</h1>
                    <p className="text-gray-600 text-lg mt-3 leading-relaxed">{product.description}</p>
                </div>

                <div className="flex items-center gap-6">
                    <p className="text-4xl font-bold text-red-500">${product.price}</p>
                    <p className="text-gray-500 text-sm border px-3 py-1 rounded-full">
                        Stock: {product.stock}
                    </p>
                </div>

                <div className="flex w-full items-center gap-4 bg-gray-100 rounded-2xl px-4 py-3 justify-between shadow-inner">
                    <div className="flex w-full items-center bg-gray-100 rounded-2xl overflow-hidden">
                        <button
                            onClick={() => setQuantity(q => Math.max(0, q - 1))}
                            className="w-12 h-12 flex justify-center items-center bg-white hover:bg-gray-100 border-r border-gray-200 cursor-pointer"
                        >
                            <Minus />
                        </button>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (isNaN(val)) return;
                                setQuantity(Math.min(Math.max(0, val), product.stock));
                            }}
                            className="w-full text-center bg-transparent text-lg font-semibold focus:outline-none cursor-text"
                            min={0}
                            max={product.stock}
                        />

                        <button
                            onClick={() => setQuantity(q => Math.min(q + 1, product.stock))}
                            className="w-12 h-12 flex justify-center items-center bg-white hover:bg-gray-100 border-l border-gray-200 cursor-pointer"
                        >
                            <Plus />
                        </button>
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                    {addedToCart ? (
                        <button className="flex-1 py-4 rounded-2xl font-semibold text-lg shadow-md bg-green-500 text-white">
                            Added to cart !
                        </button>

                    ) : (
                        <button
                            onClick={handleAdd}
                            disabled={quantity === 0 || product.stock === 0}
                            className={`flex-1 py-4 rounded-2xl font-semibold text-lg shadow-md transition 
                        ${quantity === 0 || product.stock === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"}`}
                        >
                            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                    )}
                    <button
                        onClick={toggleFavorite}
                        className={`cursor-pointer flex-1 py-4 rounded-2xl font-semibold text-lg shadow-md transition flex items-center justify-center gap-2 
                        ${favorited
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                    >
                        <Heart className={favorited ? "fill-current" : "stroke-current"} />
                        {favorited ? "Favorited" : "Add to Favorites"}
                    </button>
                </div>

                {isAdmin && (
                    <button
                        onClick={() => setEditOpen(true)}
                        className="cursor-pointer py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
                    >
                        Edit Product
                    </button>
                )}
            </div>

            <ProductModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                mode="edit"
                product={product}
            />
        </div>
    );

};

export default ProductPage;
