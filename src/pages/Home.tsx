import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { ProductCard } from "../components/ProductCard";
import AddProductCard from "../components/admin/AddProductCard";
import banner from "../assets/banner1.webp";

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
        <div className="max-w-7xl mx-auto px-6 py-10">

            {showAdminCard && (
                <div className="mb-10">
                    <AddProductCard />
                </div>
            )}

            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    {searchTerm ? `No products found for "${searchTerm}".` : "No products yet."}
                </p>
            ) : (
                <>
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {visibleProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10 items-center gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className="cursor-pointer px-5 py-2.5 bg-white rounded-full shadow-md disabled:opacity-40 hover:shadow-lg hover:bg-gray-50 transition"
                            >
                                Prev
                            </button>

                            <span className="px-5 py-2.5 bg-white rounded-full shadow-md font-semibold">
                                {page} / {totalPages}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className="cursor-pointer px-5 py-2.5 bg-white rounded-full shadow-md disabled:opacity-40 hover:shadow-lg hover:bg-gray-50 transition"
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
