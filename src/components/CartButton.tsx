import React from "react";

const CartButton = ({ count, onClick }: { count: number; onClick: () => void }) => (
  <button
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#b91c1c] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-lg font-bold hover:bg-[#eab308] transition-all"
    onClick={onClick}
  >
    🛒 سلة الطلبات
    {count > 0 && <span className="bg-white text-[#b91c1c] rounded-full px-2 py-0.5 ml-2 font-bold">{count}</span>}
  </button>
);

export default CartButton;
