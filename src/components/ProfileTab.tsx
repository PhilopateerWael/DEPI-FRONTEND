import { useState } from "react";
import api from "../Api";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfileTab = ({ user }: { user: any }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>

            <div>
                <p className="text-gray-700">
                    <span className="font-medium">Username:</span> {user.username}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Points:</span> {user.loyaltyPoints}
                </p>
            </div>

            <button
                onClick={() => setOpenModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-5 py-3 cursor-pointer"
            >
                Change Password
            </button>

            <button
                onClick={() =>
                    api.post("/auth/logout").then(() => (location.href = "/"))
                }
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-5 py-3 cursor-pointer"
            >
                Logout
            </button>

            {openModal && <ChangePasswordModal onClose={() => setOpenModal(false)} />}
        </div>
    );
};

export default ProfileTab;
