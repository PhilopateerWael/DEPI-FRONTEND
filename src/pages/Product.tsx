import { useState } from "react";
import { useParams } from "react-router-dom";
import { addProduct } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Minus, Plus } from "lucide-react";
import api from "../Api";

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const authSlice = useSelector((state : RootState) => state.auth)
    // TEMP
    const isAdmin = authSlice.user?.isAdminstartor;

    const product = useSelector((s: RootState) =>
        s.products.find((p) => p._id === id)
    );

    const [quantity, setQuantity] = useState(1);
    const [editOpen, setEditOpen] = useState(false);

    if (!product) return <div className="p-10">Product not found</div>;

    const handleAdd = () => {
        dispatch(addProduct({ productId: product._id, quantity }));
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log([...formData.entries()]);
        try {
            await api.put("/products/edit", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Updated!");
            setEditOpen(false);
            location.reload();
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    return (
        <div className="max-w-7xl max-sm:px-2 mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Left: Image */}
            <div className="w-full flex justify-center rounded-xl overflow-hidden border">
                <img
                    src={product.img}
                    alt={product.name}
                    className="object-contain w-full h-[400px]"
                />
            </div>

            {/* Right: Info */}
            <div className="flex flex-col gap-4 max-md:justify-center max-md:text-center">
                <h1 className="text-3xl font-semibold">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-2xl font-bold">${product.price}</p>
                <p className="text-sm text-gray-600">stock : {product.stock}</p>

                {/* Counter */}
                <div className="flex items-center gap-3 mt-4 max-md:justify-center">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex justify-center items-center cursor-pointer"
                    >
                        <Minus />
                    </button>

                    <span className="text-lg font-medium">{quantity}</span>

                    <button
                        onClick={() => setQuantity((q) => Math.min(q + 1, product.stock))}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex justify-center items-center cursor-pointer"
                    >
                        <Plus />
                    </button>
                </div>

                <button
                    onClick={handleAdd}
                    className="bg-black hover:bg-gray-800 text-white rounded-xl py-3 text-lg mt-auto max-md:mt-6 cursor-pointer"
                >
                    Add to Cart
                </button>

                {isAdmin && (
                    <button
                        onClick={() => setEditOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg mt-3 cursor-pointer"
                    >
                        Edit Product
                    </button>
                )}
            </div>

            {/* EDIT MODAL */}
            {editOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

                        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                            
                            {/* REQUIRED: ID */}
                            <input type="hidden" name="productId" value={product._id} />

                            <input
                                name="name"
                                type="text"
                                defaultValue={product.name}
                                placeholder="Product name"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <textarea
                                name="description"
                                defaultValue={product.description}
                                placeholder="Description"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <input
                                name="price"
                                type="number"
                                min={1}
                                defaultValue={product.price}
                                placeholder="Price"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <input
                                name="stock"
                                type="number"
                                min={1}
                                defaultValue={product.stock}
                                placeholder="Stock"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            {/* Optional image update */}
                            <input
                                name="img"
                                type="file"
                                accept="image/*"
                                className="border rounded-lg px-3 py-2"
                            />

                            <div className="flex justify-between items-center mt-4">

                                {/* DELETE */}
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!confirm("Delete product?")) return;

                                        try {
                                            await api.delete(`/products/delete`, {
                                                data: { productId: product._id },
                                            });

                                            alert("Deleted");
                                            window.location.href = "/";
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                                >
                                    Delete
                                </button>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditOpen(false)}
                                        className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
