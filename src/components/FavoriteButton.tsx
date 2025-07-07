import React from "react";

const FavoriteButton = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
  <button
    className={`ml-2 text-xl transition ${active ? 'text-[#eab308]' : 'text-gray-400 hover:text-[#eab308]'}`}
    title={active ? "إزالة من المفضلة" : "أضف للمفضلة"}
    onClick={onClick}
  >
    {active ? '★' : '☆'}
  </button>
);

export default FavoriteButton;
