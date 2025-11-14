import React, { useState, useContext, useEffect } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import InputField from "./InputField";
import Button from "./Button";
import ModalLayout from "../layout/ModelLayout";

export default function ApplyLoanForm({ customerId }) {
    const [amountRequested, setAmountRequested] = useState("");
    const [tenureMonths, setTenureMonths] = useState("");
    const [interestRate, setInterestRate] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [monthlyEMI, setMonthlyEMI] = useState(0);
    const { customer, load, setModal } = useContext(AuthContext);

    useEffect(() => {
        if (amountRequested && tenureMonths && customer?.creditScore) {
            const min = 300, max = 850;
            const normalized = Math.min(Math.max((customer.creditScore - min) / (max - min), 0), 1);
            const incomeCap = 200000;
            const incomeNorm = Math.min(customer.income / incomeCap, 1);
            const eligibilityScore = (0.6 * normalized) + (0.4 * incomeNorm);

            const rate = eligibilityScore >= 0.6 ? (9.5 - eligibilityScore * 2) : 0;
            setInterestRate(rate.toFixed(2));

            const P = Number(amountRequested);
            const r = (rate / 100) / 12;
            const n = Number(tenureMonths);
            if (P > 0 && n > 0 && r > 0) {
                const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const total = EMI * n;
                setMonthlyEMI(Math.round(EMI));
                setTotalPayable(Math.round(total));
            }
        } else {
            setInterestRate(0);
            setMonthlyEMI(0);
            setTotalPayable(0);
        }
    }, [amountRequested, tenureMonths, customer]);


    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/loan/apply", {
                customerId,
                amountRequested: Number(amountRequested),
                tenureMonths: Number(tenureMonths),
            });
            toast.success(res.data.message);
            setAmountRequested("");
            setTenureMonths("");
            setModal(false)
            await load()
        } catch (err) {
            toast.error(err.response?.data?.message || "Error applying");
        }
    };

    return (
        <ModalLayout>
            <form
                onSubmit={submit}
                className="bg-gray-800 text-white shadow-xl rounded-sm p-8 w-full max-w-md border border-gray-900 transition-all duration-300 hover:shadow-2xl"
            >
                <h3 className="text-2xl font-extrabold text-white -800 mb-6 text-center tracking-wide">
                    Apply for Loan
                </h3>

                <div className="space-y-4">
                    <InputField
                        name="amount"
                        placeholder="Loan Amount (₹)"
                        value={amountRequested}
                        onChange={(e) => setAmountRequested(e.target.value)}
                    />
                    <InputField
                        name="tenure"
                        placeholder="Tenure (months)"
                        value={tenureMonths}
                        onChange={(e) => setTenureMonths(e.target.value)}
                    />
                </div>

                {interestRate > 0 && (
                    <div className="mt-6 bg-gray-700 border border-gray-900 rounded-sm p-4 text-sm text-white">
                        <div className="flex justify-between mb-1">
                            <span className="font-medium">Interest Rate:</span>
                            <span className="font-semibold">
                                {interestRate}%
                            </span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="font-medium">Monthly EMI:</span>
                            <span className="font-semibold">
                                ₹{monthlyEMI.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Total Payable:</span>
                            <span className="font-semibold">
                                ₹{totalPayable.toLocaleString()}
                            </span>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <Button type="submit" label="Apply Now" />
                </div>
            </form>
        </ModalLayout>
    );
}
