import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import api from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { TUser } from "../../Types";
import { auth } from "../../store/slices/authSlice";
import type { AxiosError } from "axios";

function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
    return typeof error === "object" && error !== null && "isAxiosError" in error;
}


const Login = () => {
    const authSlice = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    if (authSlice.user) return <Navigate to="/" />

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await api.post<{ user: TUser }>("/auth/login", {
                email,
                password,
            });

            const user = res.data.user;

            dispatch(auth(user))
            navigate("/");
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
                    Welcome Back
                </h2>
                <p className="text-center text-sm text-gray-500 mb-8">
                    Enter your credentials to continue
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
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
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 "
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <GoogleLoginButton />
                </form>

                <div className="text-center text-sm mt-6 text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-red-500 font-medium underline-offset-2 hover:underline"
                    >
                        Create one
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

export default Login;
