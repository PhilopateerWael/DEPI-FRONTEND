import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Header from "./layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Wishlist from "./pages/Wishlist";
import { Cart } from "./pages/Cart";
import ProductPage from "./pages/Product";
import Profile from "./pages/Profile";

import env from "./env";
import api from "./Api";
import ProtectedRoute from "./components/ProtectedRoute";

import type { AppDispatch, RootState } from "./store/store";
import type { TProduct, TUser } from "./Types";
import { type TOrder } from "./store/slices/ordersSlice";

import { auth, notAuth } from "./store/slices/authSlice";
import { setFavorites } from "./store/slices/favoritesSlice";
import { setCart } from "./store/slices/cartSlice";
import { setProducts } from "./store/slices/productsSlice";
import { setOrders } from "./store/slices/ordersSlice";

const MainLayout = () => (
    <>
        <Header />
        <Outlet />
    </>
);

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);
    const [error, setError] = useState(false);
    const [loadingProducts, setLoadingPorducts] = useState(true)

    useEffect(() => {
        const safeParse = (key: string) => {
            try {
                const value = JSON.parse(localStorage.getItem(key) || "[]");
                return Array.isArray(value) ? value : [];
            } catch {
                return [];
            }
        };

        const savedCart = safeParse("cart");
        const savedWishlist = safeParse("wishlist");

        dispatch(setCart({ cart: savedCart }));
        dispatch(setFavorites(savedWishlist));

        const tryFetchSelf = async () => {
            try {
                const res = await api.get<{ user: TUser }>("/auth/me");
                dispatch(auth(res.data.user));
            } catch {
                dispatch(notAuth());
                localStorage.setItem("wishlist", JSON.stringify([]));
                localStorage.setItem("cart", JSON.stringify([]));
            }
        };

        const tryFetchProducts = async () => {
            try {
                const res = await api.get<TProduct[]>("/products/all");
                dispatch(setProducts(res.data));
            } catch {
                setError(true);
            } finally {
                setLoadingPorducts(false)
            }
        };

        const tryFetchOrders = async () => {
            try {
                const res = await api.get<TOrder[]>("/products/orders");
                dispatch(setOrders(res.data));
            } catch {
                console.log("Not Authorized");
            }
        };

        tryFetchProducts();
        tryFetchSelf();
        tryFetchOrders();
    }, [dispatch]);

    if (loading || loadingProducts) {
        return (
            <div className="h-screen flex items-center justify-center text-lg font-medium text-gray-600">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center text-center text-lg font-semibold text-gray-700">
                Sorry, the website is currently under maintenance.
            </div>
        );
    }

    return (
        <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/wishlist"
                            element={
                                <ProtectedRoute>
                                    <Wishlist />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/product/:id" element={<ProductPage />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;