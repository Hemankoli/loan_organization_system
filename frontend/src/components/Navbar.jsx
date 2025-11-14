import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        navigate("/");
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-10">
            <div className="max-w-[1400px] mx-auto md:px-10 px-4 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-3xl font-bold space-x-2 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                >
                    <span className="bg-indigo-600 text-white px-2 py-1 rounded shadow-md">LS</span>

                    <span className="tracking-tight">LoanSystem</span>

                </Link>


                <ul className="hidden md:flex gap-6 items-center">
                    {user?.role && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-sm text-white"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {menuOpen && (
                <ul className="md:hidden bg-blue-700 flex flex-col items-center gap-4 py-4">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className="block text-lg hover:text-yellow-300"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    {user?.role && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </nav>
    );
}
