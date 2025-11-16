import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { ProductCard } from "../components/ProductCard";
import AddProductCard from "../components/admin/AddProductCard";

const ITEMS_PER_PAGE = 8;

const Home = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const products = useSelector((state: RootState) => state.products);
    const searchTerm = useSelector((state: RootState) => state.search).toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrev = () => setPage(prev => Math.max(1, prev - 1));
    const handleNext = () => setPage(prev => Math.min(totalPages, prev + 1));

    const showAdminCard = user?.isAdminstartor;

    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

            {showAdminCard && <AddProductCard />}
            {filteredProducts.length === 0 ? (
                <>
                    <p className="text-center text-gray-500 text-lg mt-4">
                        {searchTerm ? `No products found for "${searchTerm}".` : "No products yet."}
                    </p>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                        {visibleProducts.map(product => (
                            <ProductCard key={product._id || product.name} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-3 items-center">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className="cursor-pointer px-4 py-2 border rounded-full bg-white disabled:opacity-40 hover:bg-gray-100 shadow-sm"
                            >
                                Prev
                            </button>

                            <span className="px-4 py-2 border rounded-full bg-white font-medium shadow-sm">
                                {page} / {totalPages}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className="cursor-pointer px-4 py-2 border rounded-full bg-white disabled:opacity-40 hover:bg-gray-100 shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
