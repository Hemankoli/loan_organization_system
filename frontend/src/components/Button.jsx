import React from "react";

export default function Button({ type = "button", label }) {
  const baseStyles ="px-5 py-2 rounded text-center w-full font-semibold transition duration-300 shadow-md";
  const typeStyles = {
    submit: "bg-blue-600 hover:bg-blue-700 text-white",
    reset: "bg-gray-400 hover:bg-gray-500 text-white",
    button: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${typeStyles[type] || typeStyles.button}`}
    >
      {label}
    </button>
  );
}
