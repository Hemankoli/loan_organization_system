import React from 'react';

export default function InputField({ name, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700 focus:outline-none border border-black rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />
    </div>
  );
}
