import api from "../Api";

const ProfileTab = ({ user }: { user: any }) => {
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
            </div>

            <button
                onClick={() =>
                    api.post("/auth/logout").then(() => (location.href = "/"))
                }
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-5 py-3 cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileTab;
