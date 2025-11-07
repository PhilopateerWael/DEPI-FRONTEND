import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home'
import Header from './layout/Header'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import env from './env';
import api from './Api';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { useEffect, useState } from 'react';
import { auth, notAuth } from './store/slices/authSlice';
import type { TProduct, TUser } from './Types';
import { setFavorites } from './store/slices/favoritesSlice';
import { setCart } from './store/slices/cartSlice';
import Wishlist from './pages/Wishlist';
import { Cart } from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import { setProducts } from './store/slices/productsSlice';
import ProductPage from './pages/Product';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

function App() {
    const dispatch = useDispatch<AppDispatch>()
    const authSlice = useSelector((state: RootState) => state.auth)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!Array.isArray(JSON.parse(localStorage.getItem("cart") || "[]"))) {
            localStorage.setItem("cart", JSON.stringify([]))
        } else {
            dispatch(setCart({ cart: JSON.parse(localStorage.getItem("cart") as string || "[]") }))
        }

        if (!Array.isArray(JSON.parse(localStorage.getItem("wishlist") || "[]"))) {
            localStorage.setItem("wishlist", JSON.stringify([]))
        } else {
            dispatch(setFavorites(JSON.parse(localStorage.getItem("wishlist") as string || "[]")))
        }

        async function tryFetchSelf() {
            try {
                const res = await api.get<{ user: TUser }>("/auth/me")
                dispatch(auth(res.data.user))
            } catch (e) {
                dispatch(notAuth())
                localStorage.setItem("wishlist", JSON.stringify([]))
                localStorage.setItem("cart", JSON.stringify([]))
            }
        }

        async function tryFetchProducts() {
            try {
                const res = await api.get<TProduct[]>("/products/all");
                console.log(res);
                dispatch(setProducts(res.data));
            } catch (err: any) {
                setError(true)
            }
        }

        tryFetchProducts()
        tryFetchSelf()
    }, [])


    if (authSlice.loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <h1>Sorry ... Website is currently under maintenence</h1>
    }

    return (
        <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>}></Route>
                        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}></Route>
                        <Route path="/product/:id" element={<ProductPage />} />
                    </Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}


export default App
