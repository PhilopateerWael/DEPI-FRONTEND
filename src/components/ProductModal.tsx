import { useState, useEffect } from "react";
import api from "../Api";

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    product?: {
        _id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        img: string;
    };
    onSuccess?: () => void;
}

const ProductModal = ({ open, onClose, mode, product, onSuccess }: ProductModalProps) => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (mode === "edit" && product) {
            setPreview(product.img);
        } else {
            setPreview(null);
        }
    }, [mode, product]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setLoading(true);
        try {
            if (mode === "add") {
                await api.post("/products/add", formData, { headers: { "Content-Type": "multipart/form-data" } });
            } else if (mode === "edit" && product) {
                formData.append("productId", product._id);
                await api.put("/products/edit", formData, { headers: { "Content-Type": "multipart/form-data" } });
            }
            onSuccess?.();
            onClose();
            location.reload();
        } catch {
            alert(`Failed to ${mode === "edit" ? "update" : "add"} product`);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative animate-fade-in max-h-2/3 overflow-y-scroll">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    {mode === "edit" ? "Edit Product" : "Add New Product"}
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        type="text"
                        defaultValue={product?.name}
                        placeholder="Product Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none "
                        required
                    />

                    <textarea
                        name="description"
                        defaultValue={product?.description}
                        placeholder="Description"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none "
                        rows={3}
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        defaultValue={product?.price}
                        placeholder="Price"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none "
                        required
                    />

                    <input
                        name="stock"
                        type="number"
                        defaultValue={product?.stock}
                        placeholder="Stock"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none "
                        required
                    />

                    <input
                        name="img"
                        type="file"
                        accept="image/*"
                        className="border border-gray-300 rounded-lg px-4 py-2 file:border-0 file:bg-red-500 file:text-white file:px-3 file:py-1 file:rounded-md file:cursor-pointer"
                        onChange={handleFileChange}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-contain rounded-lg border mt-2"
                        />
                    )}

                    <div className="flex justify-between items-center mt-6 cursor-pointer">
                        {mode === "edit" && product && (
                            <button
                                type="button"
                                onClick={async () => {
                                    if (!confirm("Delete product?")) return;
                                    try {
                                        await api.delete(`/products/delete`, { data: { productId: product._id } });
                                        alert("Deleted");
                                        window.location.href = "/";
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                            >
                                Delete
                            </button>
                        )}

                        <div className="flex gap-2 ml-auto">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={`px-5 py-2 rounded-lg text-white ${loading
                                    ? "bg-red-300 cursor-not-allowed"
                                    : "bg-red-500 hover:bg-red-600"} cursor-pointer flex items-center justify-center`}
                                disabled={loading}
                            >
                                {loading ? (mode === "edit" ? "Saving..." : "Adding...") : mode === "edit" ? "Save" : "Add"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
