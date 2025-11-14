import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import api from "../../Api";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import type { TUser } from "../../Types";
import type { AxiosError } from "axios";

function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
    return typeof error === "object" && error !== null && "isAxiosError" in error;
}

const Register = () => {
    const authSlice = useSelector((state: RootState) => state.auth)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    if (authSlice.user) return <Navigate to="/" />

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await api.post<{ user: TUser }>("/auth/register", {
                username,
                email,
                password,
            });

            location.reload()
        } catch (err: unknown) {
            let msg = "Something went wrong";

            if (isAxiosError(err)) {
                msg = err.response?.data?.message ?? msg;
            } else if (err instanceof Error) {
                msg = err.message;
            }

            alert(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-100">

                <h2 className="text-3xl font-semibold text-center mb-2 tracking-tight">
                    Create Account
                </h2>
                <p className="text-center text-sm text-gray-500 mb-8">
                    Enter your details to get started
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 "
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="johndoe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 "
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 "
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 "
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <GoogleLoginButton />
                </form>

                <div className="text-center text-sm mt-6 text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-red-500 font-medium underline-offset-2 hover:underline"
                    >
                        Log in
                    </Link>

                    <div className="text-center text-sm mt-2 text-gray-600">
                        <Link
                            to="/"
                            className="text-red-500 font-medium underline-offset-2 hover:underline"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
