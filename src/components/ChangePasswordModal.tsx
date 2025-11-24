import { useState } from "react";
import api from "../Api";

const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (newPassword !== repeatNewPassword) {
            return setError("New passwords do not match.");
        }

        if (newPassword.length < 6) {
            return setError("New password must be at least 6 characters long.");
        }

        try {
            await api.post("/auth/change-password", {
                oldPassword,
                newPassword,
            });

            setSuccess("Password updated successfully.");
            setTimeout(() => onClose(), 1200);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>

                <div className="flex flex-col gap-3">
                    <input
                        type="password"
                        placeholder="old Password"
                        value={oldPassword}
                        onChange={(e) => setoldPassword(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        type="password"
                        placeholder="Repeat New Password"
                        value={repeatNewPassword}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
