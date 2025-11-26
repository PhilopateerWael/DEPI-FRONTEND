import { Flame, ShoppingCart, Heart, Search, User2Icon, LogIn } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearch } from "../store/slices/searchSlice";
import { useRef } from "react";

const Header = () => {
    const authSlice = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const intervalRef = useRef<any>(null);
    const loadSearch = location.pathname === "/products";

    function handleSearchChange(term: string) {
        if (intervalRef.current) clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(() => dispatch(setSearch(term)), 800);
    }

    return (
        <header className="w-full shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6 flex-wrap max-sm:flex-col-reverse max-sm:px-2">

                <button
                    className="flex items-center gap-2 text-red-600 font-semibold text-lg cursor-pointer hover:text-red-700 max-sm:hidden"
                    onClick={() => navigate("/")}
                >
                    <Flame className="w-6 h-6" />
                    <span>Hot Deals</span>
                </button>
                {loadSearch &&
                    <div className="flex items-center flex-1 max-w-2xl max-sm:w-full">
                        <div className="flex items-center w-full border rounded-full overflow-hidden">
                            <input
                                className="flex-1 px-4 py-2 outline-none text-sm"
                                type="text"
                                placeholder="What are you looking for?"
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                            <button className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                }
                <div className="flex items-center gap-4 max-sm:w-full">

                    <button
                        className="flex items-center gap-2 text-red-600 font-semibold text-lg cursor-pointer hover:text-red-700 sm:hidden"
                        onClick={() => navigate("/")}
                    >
                        <Flame className="w-6 h-6" />
                        <span>Hot Deals</span>
                    </button>

                    <div className="ml-auto gap-2 flex">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 cursor-pointer transition"
                            onClick={() => navigate('/wishlist')}
                        >
                            <Heart className="w-6 h-6" />
                        </button>

                        <button
                            className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 cursor-pointer transition"
                            onClick={() => navigate('/cart')}
                        >
                            <ShoppingCart className="w-6 h-6" />
                        </button>

                        {authSlice.user ? (
                            <button
                                className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 cursor-pointer transition"
                                onClick={() => navigate('/profile')}
                            >
                                <User2Icon className="w-6 h-6" />
                            </button>
                        ) : (
                            <button
                                className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 cursor-pointer transition"
                                onClick={() => navigate('/login')}
                            >
                                <LogIn className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
