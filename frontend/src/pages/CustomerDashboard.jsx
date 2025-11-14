import React, { useEffect, useContext, Activity } from "react";
import ApplyLoanForm from "../components/ApplyLoanForm";
import { AuthContext } from "../context/AuthContext";
import CreditScoreCard from "../components/CreditScoreCard";

export default function CustomerDashboard() {
    const { user, modal, setModal, load, customer, applications } = useContext(AuthContext);

    useEffect(() => {
        if (user) load();
    }, [user]);

    return (
        <section className="bg-gray-900">
            <div className="max-w-[1400px] mx-auto py-20 md:px-10 px-4 min-h-screen flex md:flex-row flex-col items-start gap-10">
                {customer &&
                    <div className="md:w-[30%] w-full">
                        <CreditScoreCard customer={customer} />
                    </div>
                }
                <div className="w-full md:w-[68%] bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-white/20 rounded shadow p-8 text-white">
                    {customer ? (
                        <>
                            <div className="mb-10 flex justify-end">
                                <button
                                    onClick={() => setModal(true)}
                                    className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-sm shadow-lg hover:scale-105 transition-transform duration-300"
                                >
                                    Apply for a Loan
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-full"></span>
                                </button>
                            </div>

                            <div className="mt-10 overflow-y-auto h-[600px]">
                                <h3 className="text-2xl font-semibold mb-6 text-white border-b border-blue-400/30 pb-2">
                                    Your Loan Applications
                                </h3>

                                {applications.length > 0 ? (
                                    <ul className="space-y-6">
                                        {applications.map((a) => {
                                            const P = Number(a.amountRequested);
                                            const r = a.interestRate > 0 ? (a.interestRate / 100) / 12 : 0;
                                            const n = Number(a.tenureMonths || 0);

                                            let EMI = 0, total = 0;
                                            if (r > 0 && n > 0) {
                                                EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                                                total = EMI * n;
                                            }

                                            return (
                                                <li
                                                    key={a._id}
                                                    className="p-5 rounded-sm bg-gradient-to-r from-gray-800/60 to-gray-700/40 border border-white/10 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <p className="font-semibold text-lg">
                                                            Amount: <span className="text-blue-300">₹{a.amountRequested}</span>
                                                        </p>
                                                        <span
                                                            className={`px-4 py-1.5 text-sm font-semibold rounded ${a.status === "APPROVED"
                                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                                : a.status === "PENDING"
                                                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                }`}
                                                        >
                                                            {a.status}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-1 text-gray-300 text-sm">
                                                        <p>
                                                            Eligibility Score:{" "}
                                                            <span className="text-blue-400 font-medium">
                                                                {a.eligibilityScore ?? "N/A"}
                                                            </span>
                                                        </p>

                                                        {a.interestRate > 0 && (
                                                            <>
                                                                <p>
                                                                    Interest Rate:{" "}
                                                                    <span className="text-purple-300 font-medium">
                                                                        {a.interestRate.toFixed(2)}%
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    Tenure:{" "}
                                                                    <span className="text-blue-300 font-medium">
                                                                        {a.tenureMonths} months
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    Monthly EMI:{" "}
                                                                    <span className="text-green-400 font-medium">
                                                                        ₹{Math.round(EMI).toLocaleString()}
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    Total Payable:{" "}
                                                                    <span className="text-amber-400 font-medium">
                                                                        ₹{Math.round(total).toLocaleString()}
                                                                    </span>
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-center mt-6">
                                        You don’t have any loan applications yet.
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-400 text-center mt-10">Loading your data...</p>
                    )}
                </div>
            </div>
            {customer && modal && (
                <Activity>
                    <ApplyLoanForm customerId={customer._id} />
                </Activity>
            )}
        </section>
    );
}
