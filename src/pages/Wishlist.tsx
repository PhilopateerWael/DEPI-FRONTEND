import { WishlistProduct } from "../components/WishlistProduct";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const Wishlist = () => {
    const items = useSelector((state : RootState) => state.favorites)
    const products = useSelector((state : RootState) => state.products)

    const wishlistProducts = products.filter((p) => items.includes(p._id));

    return (
        <div className="max-w-7xl max-sm:px-2 mx-auto px-6 py-6">
            <h1 className="text-2xl font-semibold mb-6">Wishlist</h1>

            <div className="flex flex-col gap-3">
                {wishlistProducts.map((product) => (
                    <WishlistProduct
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

            {items.length === 0 && (
                <p className="text-gray-500 text-center mt-6">
                    No items in your wishlist.
                </p>
            )}
        </div>
    );
};

export default Wishlist;