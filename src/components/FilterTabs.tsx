import React from "react";

const FilterTabs = ({ active, onChange }: { active: string; onChange: (v: string) => void }) => {
  const tabs = [
    { label: "الكل", value: "all" },
    { label: "سندوتشات", value: "sandwiches" },
    { label: "كومبو", value: "combos" },
    { label: "إضافات", value: "extras" },
    { label: "شيبس", value: "chips" },
    { label: "مشروبات", value: "drinks" },
  ];
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`px-4 py-1 rounded-full font-bold border-2 transition text-base ${active === tab.value ? 'bg-[#eab308] text-white border-[#eab308]' : 'bg-white/80 border-gray-300 text-[#b91c1c]'}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
