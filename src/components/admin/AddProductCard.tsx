import { useState } from "react";
import ProductModal from "../ProductModal";

const AddProductCard = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="border border-red-500 cursor-pointer text-red-500 rounded-xl shadow cursor-pointer flex justify-center items-center p-6 bg-white font-semibold text-lg w-full max-w-xs mx-auto"
            >
                + Add Product
            </button>

            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                mode="add"
            />

        </>
    );
};

export default AddProductCard;
