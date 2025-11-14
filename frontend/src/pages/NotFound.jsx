import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-4">
            <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">404</h1>
            <div className="bg-red-500 text-white px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <p className="mt-5 text-gray-400 text-lg">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            <button
                onClick={() => navigate(-1)}
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all"
            >
                <FaArrowLeft /> Go Back
            </button>
        </div>
    );
}