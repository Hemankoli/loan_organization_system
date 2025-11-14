import React, { useEffect, useState } from "react";

export default function CreditScoreCard({ customer }) {
    const [score, setScore] = useState(0);
    const creditScore = customer.creditScore || 650;

    useEffect(() => {
        let start = 0;
        const interval = setInterval(() => {
            if (start < creditScore) {
                start += 10;
                setScore(start);
            } else {
                clearInterval(interval);
            }
        }, 20);
        return () => clearInterval(interval);
    }, [creditScore]);

    const getScoreColor = (score) => {
        if (score < 600) return "text-red-500";
        if (score < 700) return "text-yellow-400";
        if (score < 800) return "text-green-400";
        return "text-emerald-400";
    };

    const circleColor = (score) => {
        if (score < 600) return "from-red-500 to-orange-400";
        if (score < 700) return "from-yellow-400 to-lime-400";
        if (score < 800) return "from-green-400 to-emerald-400";
        return "from-emerald-400 to-teal-400";
    };

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 900) * circumference;

    return (
        <div className="relative bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-white/10 rounded-sn shadow-2xl p-8 w-full max-w-sm mx-auto overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
            <h3 className="text-lg font-semibold text-center text-white mb-6">
                Welcome,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {customer.name}
                </span>
            </h3>

            <div className="relative flex items-center justify-center mb-4">
                <svg width="130" height="130" className="-rotate-90">
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop
                                offset="0%"
                                stopColor={
                                    score < 600
                                        ? "#ef4444"
                                        : score < 700
                                            ? "#facc15"
                                            : score < 800
                                                ? "#22c55e"
                                                : "#10b981"
                                }
                            />
                            <stop
                                offset="100%"
                                stopColor={
                                    score < 600
                                        ? "#f97316"
                                        : score < 700
                                            ? "#84cc16"
                                            : score < 800
                                                ? "#4ade80"
                                                : "#34d399"
                                }
                            />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="65"
                        cy="65"
                        r={50}
                        stroke="#1f2937"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="65"
                        cy="65"
                        r={50}
                        stroke="url(#grad)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 - (score / 900) * (2 * Math.PI * 50)}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-in-out drop-shadow-lg"
                    />
                </svg>
                <div className="absolute text-center">
                    <h2
                        className={`text-lg font-extrabold ${getScoreColor(
                            score
                        )} transition-all duration-700 drop-shadow-md`}
                    >
                        {score}
                    </h2>
                    <p className="text-gray-400 text-xs mt-1 tracking-wide uppercase">
                        CIBIL Score
                    </p>
                </div>
            </div>

            <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2 px-4">
                <span>300</span>
                <span>Good</span>
                <span>900</span>
            </div>

            <div className="mt-6 bg-white/10 rounded-sm p-4 text-sm text-gray-300 border border-white/10">
                <p className="mb-1">
                    <span className="font-medium text-gray-200">Email:</span>{" "}
                    {customer.email}
                </p>
                <p>
                    <span className="font-medium text-gray-200">Income:</span> ₹
                    {customer.income.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
