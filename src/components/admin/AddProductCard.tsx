import { useState } from "react";
import api from "../../Api";

const AddProductCard = () => {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const res = await api.post("/products/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setOpen(false);
            location.reload();
        } catch (error) {
            alert("Failed to add product");
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="border rounded-xl shadow-sm bg-white p-6 flex justify-center items-center hover:shadow-md transition cursor-pointer text-gray-700 font-medium"
            >
                + Add Product
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Add new product
                        </h2>

                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                name="name"
                                type="text"
                                placeholder="Product name"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <input
                                name="price"
                                type="number"
                                placeholder="Price"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <input
                                name="stock"
                                type="number"
                                placeholder="Stock"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <input
                                name="img"
                                type="file"
                                accept="image/*"
                                className="border rounded-lg px-3 py-2"
                                required
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProductCard;
