import React from "react";

const SearchBar = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <input
    type="text"
    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eab308] mb-4 text-lg"
    placeholder="ابحث عن صنف أو مكون..."
    value={value}
    onChange={e => onChange(e.target.value)}
    dir="rtl"
  />
);

export default SearchBar;
