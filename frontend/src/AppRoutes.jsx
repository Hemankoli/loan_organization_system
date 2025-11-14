import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';


export default function AppRoutes() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.token) {
            if (user?.role === "CUSTOMER") {
                navigate("/customer");
            } else {
                navigate("/officer");
            }
        } 
    }, [])
    
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/customer" element={<CustomerDashboard />} />
                <Route path="/officer" element={<OfficerDashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}
