import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function OfficerDashboard() {
    const [loans, setLoans] = useState({ pending: [], approved: [], rejected: [] });
    const [activeTab, setActiveTab] = useState("PENDING");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function load() {
            try {
                const res = await api.get("/officer/loans/all");
                const allLoans = res.data;
                setLoans({
                    pending: allLoans.filter((l) => l.status === "PENDING"),
                    approved: allLoans.filter((l) => l.status === "APPROVED"),
                    rejected: allLoans.filter((l) => l.status === "REJECTED"),
                });
            } catch (err) {
                console.error(err);
                toast.error("Failed to load loans");
            }
        }
        load();
    }, []);

    const review = async (id, decision) => {
        try {
            const res = await api.post(`/officer/loans/${id}/review`, {
                decision,
                officerUserId: user?.user?.userId,
            });
            toast.success(res.data.message);

            setLoans((prev) => ({
                ...prev,
                pending: prev.pending.filter((x) => x._id !== id),
                approved:
                    decision === "APPROVED"
                        ? [...prev.approved, prev.pending.find((x) => x._id === id)]
                        : prev.approved,
                rejected:
                    decision === "REJECTED"
                        ? [...prev.rejected, prev.pending.find((x) => x._id === id)]
                        : prev.rejected,
            }));
        } catch (err) {
            toast.error(err.response?.data?.message || "Error");
        }
    };

    const renderLoans = (data) => {
        if (data.length === 0)
            return (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center text-gray-600 mt-6"
                >
                    No {activeTab.toLowerCase()} loans.
                </motion.p>
            );

        return (
            <AnimatePresence mode="wait">
                <motion.ul
                    key={activeTab}  // IMPORTANT for tab animation
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                >
                    {data.map((app) => (
                        <motion.li
                            key={app._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className="bg-gray-800 border border-gray-700 rounded shadow-sm hover:shadow-md transition-shadow duration-300 p-5"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                                <div>
                                    <p className="text-gray-300 font-medium space-x-4">
                                        <span className="text-white">Customer:</span>{" "}
                                        <span className="text-purple-400">
                                            {app.customerId?.userId?.name || "Unknown"}
                                        </span>
                                    </p>
                                    <p className="text-gray-400 text-sm">Amount: ₹{app.amountRequested}</p>
                                    <p className="text-gray-400 text-sm">Eligibility Score: {app.eligibilityScore ?? "N/A"}</p>
                                    <p className="text-gray-400 text-sm">Tenure: {app.tenureMonths} months</p>
                                    {app.interestRate && (
                                        <p className="text-gray-400 text-sm">
                                            Interest Rate: {app.interestRate.toFixed(2)}%
                                        </p>
                                    )}
                                </div>

                                {activeTab === "PENDING" && (
                                    <div className="flex gap-3 mt-2 md:mt-0">
                                        <button
                                            onClick={() => review(app._id, "APPROVED")}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => review(app._id, "REJECTED")}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </AnimatePresence>
        );
    };


    return (
        <section className="bg-gray-900">
            <div className="min-h-screen max-w-[1400px] mx-auto py-20 md:px-10 px-4 flex items-start gap-10 md:flex-row flex-col">
                <div className="relative w-full md:w-[30%] bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-white/10 rounded-sn shadow-2xl p-8 w-full max-w-sm mx-auto overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <h3 className="text-lg font-semibold text-center text-white mb-6">
                        Welcome,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            {user?.user?.email}
                        </span>
                    </h3>
                    <div className="mt-6 bg-white/10 rounded-sm p-4 text-sm text-gray-300 border border-white/10">
                        <p className="mb-1">
                            <span className="font-medium text-gray-200">Email:</span> {user?.user?.email}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium text-gray-200">Role:</span> {user?.role}
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-[70%] bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-white/20 rounded shadow p-8 text-white">
                    <h2 className="text-3xl font-semibold text-white mb-6 text-center">
                        Officer Dashboard
                    </h2>

                    <div className="flex justify-center mb-6 gap-3">
                        {["PENDING", "APPROVED", "REJECTED"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-md font-medium transition-all ${activeTab === tab
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-800 text-gray-400 hover:text-white"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {renderLoans(loans[activeTab.toLowerCase()])}
                </div>
            </div>
        </section>
    );
}
