import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import AddProductCard from "../components/admin/AddProductCard";

const Home = () => {
    const authSlice = useSelector((state: RootState) => state.auth);
    const products = useSelector((state: RootState) => state.products);
    const ITEMS_PER_PAGE = 8;
    const [page, setPage] = useState(1);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginated = products.slice(start, end);
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

            {products.length === 0 && (
                <p className="text-center text-gray-500 text-lg">
                    No products yet.
                </p>
            )}

            {products.length > 0 || authSlice.user?.isAdminstartor ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {authSlice.user?.isAdminstartor ? <AddProductCard /> : null}
                        {paginated.map((p, i) => (
                            <ProductCard key={i} product={p} />
                        ))}
                    </div>

                    {/* ✅ Pagination */}
                    <div className="flex justify-center mt-8 gap-3 items-center">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="cursor-pointer px-4 py-2 border rounded-full bg-white disabled:opacity-40 hover:bg-gray-100 shadow-sm"
                        >
                            Prev
                        </button>

                        <span className="px-4 py-2 border rounded-full bg-white font-medium shadow-sm">
                            {page} / {totalPages}
                        </span>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="cursor-pointer px-4 py-2 border rounded-full bg-white disabled:opacity-40 hover:bg-gray-100 shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Home