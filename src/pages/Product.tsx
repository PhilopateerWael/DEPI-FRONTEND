import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addProduct } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Minus, Plus, Heart } from "lucide-react";
import ProductModal from "../components/ProductModal";

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const authSlice = useSelector((state: RootState) => state.auth);
    const isAdmin = authSlice.user?.isAdminstartor;

    const product = useSelector((s: RootState) =>
        s.products.find((p) => p._id === id)
    );

    const favorites = useSelector((s: RootState) => s.favorites);

    const [quantity, setQuantity] = useState(0);
    const [favorited, setFavorited] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        if (product) setFavorited(favorites.includes(product._id));
    }, [product, favorites]);

    if (!product) return <div className="p-10 text-center text-lg">Product not found</div>;

    const handleAdd = () => {
        if (quantity > 0) dispatch(addProduct({ productId: product._id, quantity }));
    };

    const toggleFavorite = () => {
        if (!product) return;
        if (favorited) dispatch({ type: "favorites/removeFavorite", payload: product._id });
        else dispatch({ type: "favorites/addFavorite", payload: product._id });
        setFavorited(!favorited);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-12">
            {/* Left: Product Image */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex justify-center items-center">
                <img
                    src={product.img}
                    alt={product.name}
                    className="object-contain h-[200px] rounded-xl"
                />
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 flex flex-col gap-6 md:max-w-1/2">
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-700 text-lg wrap-break-word">{product.description}</p>

                <div className="flex items-center gap-4">
                    <p className="text-3xl font-extrabold text-red-500">${product.price}</p>
                    <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mt-auto">
                    <button
                        onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                        className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 flex justify-center items-center"
                    >
                        <Minus />
                    </button>
                    <span className="text-lg font-medium mx-auto">{quantity}</span>
                    <button
                        onClick={() => setQuantity((q) => Math.min(q + 1, product.stock))}
                        className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 flex justify-center items-center"
                    >
                        <Plus />
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                        onClick={handleAdd}
                        disabled={quantity === 0 || product.stock === 0}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-colors
                                    ${quantity === 0 || product.stock === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800 text-white"
                            }`}
                    >
                        {product.stock > 0 ? "Add to Cart" : "out of stock"}
                    </button>


                    <button
                        onClick={toggleFavorite}
                        className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-xl font-semibold transition-colors
                        ${favorited ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                    >
                        <Heart className={favorited ? "fill-current" : "stroke-current"} />
                        {favorited ? "Favorited" : "Add to Favorites"}
                    </button>
                </div>

                {isAdmin && (
                    <button
                        onClick={() => setEditOpen(true)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
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
