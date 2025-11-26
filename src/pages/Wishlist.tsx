import { WishlistProduct } from "../components/WishlistProduct";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const Wishlist = () => {
    const items = useSelector((state: RootState) => state.favorites)
    const products = useSelector((state: RootState) => state.products)

    const wishlistProducts = products.filter((p) => items.includes(p._id));

    return (
        <div className="max-w-7xl mx-auto px-6 max-sm:px-2 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Wishlist</h1>

            <div className="flex flex-col gap-3">
                {wishlistProducts.map((product) => (
                    <WishlistProduct key={product._id} product={product} />
                ))}
            </div>

            {items.length === 0 && (
                <p className="text-gray-500 text-center mt-8 text-lg">
                    No items in your wishlist.
                </p>
            )}
        </div>

    );
};

export default Wishlist;