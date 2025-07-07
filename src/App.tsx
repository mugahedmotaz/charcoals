import React, { PropsWithChildren, ReactNode, useState, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import FavoriteButton from "./components/FavoriteButton";
import CartButton from "./components/CartButton";
import Logo from "./logo.png";

const whatsappNumber = "249920486301";
const phoneNumber = "0123456789";

// حذف صور الأصناف
const itemImages: Record<string, string> = {};

const sandwiches = [
  { name: "كلاسيك", beef: 7500, chicken: 8500, content:"لحمه/فراخ +مايونيز+كاتشب+ بصل + خس"},
  { name: "تشيز", beef: 8000, chicken: 9000, content:"لحمه/فراخ +مايونيز+كاتشب+ جبنه + بصل+ خس" },
  { name: "باربكيو", beef: 9000, chicken: 10000, content:"لحمه/فراخ +مايونيز+كاتشب+ جبنه + باربكيو + بصل+ خس" },
  { name: "هالبينو", beef: 9500, chicken: 10500, content:"لحمه/فراخ +مايونيز+ كاتشب+ جبنه + هالبينو+ بصل+ خس" },
  { name: "سيكريت", beef: 9000, chicken: 10000, content:"لحمه/فراخ +مايونيز+كاتشب+ جبنه + سويت صوص+ بصل+ خس" },
  { name: "ايشن", beef: 9000, chicken: 10000, content:"لحمه/فراخ +مايونيز+ جبنه + سويت صوص+ بصل+ خس" },
  { name: "إسموكي", beef: 10000, chicken: 11000, content:"لحمة/فراخ + مايونيز + جبنة + صوص مدخن + بصل + خس" },
  { name: "جوسي تشارلي", beef: 11000, chicken: 12000, content:"لحمه/فراخ +مايونيز+كاتشب+ جبنه + مارتدلا+ بصل+ خس" },
  { name: "دبل ميكس", beef: 12500, chicken: 13500, content:"دبل قطعه بيرقر +مايونيز+ جبنه + اسبشل صوص+ بصل+ خس" },
  { name: "شاركلز", beef: 13000, chicken: 14000, content:"لحمه/فراخ +مايونيز+كاتشب+ جبنه +شيدر صوص + بصل+ خس" },
];
const combos = [
  { name: " كومبو كلاسيك", beef: 15500, chicken: 16500,  content:"لحمه/فراخ +مايونيز+كاتشب+ بصل + خس "},
  { name:  " كومبو تشيز", beef: 16000, chicken: 17000, },
  { name: " كومبو باربكيو", beef: 17000, chicken: 18000, },
  { name: " كومبو هالبينو", beef: 17500, chicken: 18500, },
  { name: " كومبو سيكريت", beef: 17000, chicken: 18000, },
  { name: " كومبو ايشن", beef: 17000, chicken: 18000, },
  { name: " كومبو إسموكي", beef: 18000, chicken: 19000, },
  { name: "كومبو جوسي تشارلي", beef: 19000, chicken: 20000, },
  { name: "كومبو دبل ميكس", beef: 20500, chicken: 21500, },
  { name: "كومبو شاركلز", beef: 21000, chicken: 22000, },
];
const extras = [
  { name: "قطعة لحم", price: 4000 },
  { name: "قطعة فراخ", price: 4500 },
  { name: "قطعة مارتديلا", price: 2000 },
  { name: "صوص سويت شيلي", price: 1000 },
  { name: "صوص مايونيز", price: 1000 },
  { name: "شرائح هالبينو", price: 1000 },
  { name: "جبنة شرائح", price: 1000 },
  { name: "جبنة صوص شيدر", price: 1000 },
  { name: "صوص باربكيو", price: 1000 },
];
const chips = [
  { name: "شيبس", price: 6000 },
  { name: "شيبس بالجبنة", price: 6500 },
  { name: "شيبس بالهالبينو", price: 7000 },
  { name: "شيبس شاركلز", price: 7500 },
  { name: "شيبس كرسبي", price: 8000 },
  { name: "شيبس عائلي", price: 8500 },
];
const drinks = [
  { name: "مياه غازية", price: 1500 },
  { name: "مياه معدنية", price: 1000 },
];

function waLink(item: string) {
  return `https://wa.me/${whatsappNumber}?text=أرغب في طلب: ${encodeURIComponent(item)}`;
}
function callLink() {
  return `tel:${phoneNumber}`;
}

type SectionProps = {
  title: string;
  icon: string;
  color: string;
  children: ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, icon, color, children }) => (
  <section className={["mb-10 rounded-2xl shadow-lg border-2", color, "bg-white/95 p-5"].join(" ")}>
    <div className="flex items-center gap-2 mb-3">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-2xl font-bold text-gray-800 flex-1">{title}</h2>
    </div>
    <ul className="space-y-3">{children}</ul>
  </section>
);

const mainRed = "#b91c1c"; // أحمر غامق (رئيسي)
const mainYellow = "#fbbf24"; // أصفر (ثانوي)
const mainGray = "#f3f4f6"; // رمادي فاتح للخلفية
const mainGold = "#000"; // ذهبي عصري للأزرار
const mainDark = "#222"; // نص داكن
const mainOrange = "#ff8800"; // برتقالي عصري
const mainGradient = "bg-gradient-to-br from-[#fff8f1]/95 via-[#ffe7b2]/90 via-[#fbbf24]/60 to-[#b91c1c]/30";

// تحديث ألوان الوضع الليلي
const darkBg = '#18181b'; // لون قريب من مواقع المطاعم العصرية
const darkSection = '#23232a';
const darkText = 'text-white';
const lightText = 'text-[#222]';

const App: React.FC = () => {
  // البحث
  const [search, setSearch] = useState("");
  // الفلترة
  const [filter, setFilter] = useState("all");
  // المفضلة
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem("favorites") || "[]"));
  // السلة
  const [cart, setCart] = useState<any[]>(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  // حالة عرض السلة
  const [showCart, setShowCart] = useState(false);
  // حالة عرض المفضلة
  const [showFavs, setShowFavs] = useState(false);
  // إشعارات بسيطة
  const [notification, setNotification] = useState<string | null>(null);
  function showNotification(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  }

  React.useEffect(() => { localStorage.setItem("favorites", JSON.stringify(favorites)); }, [favorites]);
  React.useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);

  // دمج كل الأصناف في مصفوفة واحدة مع النوع
  const allItems = useMemo(() => [
    ...sandwiches.map(i => ({ ...i, type: "sandwiches" })),
    ...combos.map(i => ({ ...i, type: "combos" })),
    ...extras.map(i => ({ ...i, type: "extras" })),
    ...chips.map(i => ({ ...i, type: "chips" })),
    ...drinks.map(i => ({ ...i, type: "drinks" })),
  ], []);

  // تطبيق البحث والفلترة
  const filteredItems = useMemo(() =>
    allItems.filter(item =>
      (filter === "all" || item.type === filter) &&
      (search === "" || (item.name && item.name.includes(search)))
    ), [allItems, filter, search]);

  // فصل الأصناف حسب النوع بعد الفلترة
  const sectionedItems = useMemo(() => ({
    sandwiches: filteredItems.filter(i => i.type === "sandwiches"),
    combos: filteredItems.filter(i => i.type === "combos"),
    extras: filteredItems.filter(i => i.type === "extras"),
    chips: filteredItems.filter(i => i.type === "chips"),
    drinks: filteredItems.filter(i => i.type === "drinks"),
  }), [filteredItems]);

  // إضافة/إزالة من المفضلة
  const toggleFavorite = (name: string) => {
    setFavorites(favs => favs.includes(name) ? favs.filter(f => f !== name) : [...favs, name]);
  };
  // إضافة للسلة وتلقائياً للمفضلة
  function addToCart(item: any) {
    setCart(c => {
      const idx = c.findIndex((i: any) => i.name === item.name);
      if (idx > -1) {
        // إذا كان المنتج موجوداً، زد الكمية
        const updated = [...c];
        updated[idx] = { ...updated[idx], qty: (updated[idx].qty || 1) + 1 };
        return updated;
      } else {
        // أضف المنتج مع qty=1
        return [...c, { ...item, qty: 1 }];
      }
    });
    if (!favorites.includes(item.name)) setFavorites(favs => [...favs, item.name]);
    showNotification('تمت الإضافة للسلة');
  }
  function removeFromCart(name: string) {
    setCart(c => c.filter(i => i.name !== name));
    showNotification('تم حذف المنتج من السلة');
  }
  function changeQty(name: string, qty: number) {
    setCart(c => c.map(i => i.name === name ? { ...i, qty: Math.max(1, qty) } : i));
  }
  function handleOrder() {
    // رسالة واتساب منظمة واحترافية
    const orderLines = cart.map((i, idx) =>
      `*${idx + 1}. ${i.name}*\n  - الكمية: ${i.qty || 1}\n التعليق - *${i.comment}*.\n  - سعر الوحدة: ${i.price || i.beef || 0} جنيه\n  - الإجمالي: ${(i.price || i.beef || 0) * (i.qty || 1)} جنيه`
    ).join("\n-----------------------------\n");
    const orderText = `* طلب جديد من موقع شاركلز - بورتسودان*\n\n${orderLines}\n\n*الإجمالي الكلي:* ${total} جنيه\n\n*العنوان:* بورتسودان - شارع جامعة البحر الاحمر\n\n*يرجى تأكيد الطلب أو التواصل لأي استفسار. شكراً لاختياركم شاركلز! 🥪🔥`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
    window.open(url, '_blank');
    setCart([]); // تفريغ السلة بعد الطلب
    showNotification('تم تحويلك للواتساب لإتمام الطلب');
  }

  // حساب السعر الإجمالي للسلة
  const total = cart.reduce((sum, item) => sum + ((item.price || item.beef || 0) * (item.qty || 1)), 0);
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  // حالة نافذة اختيار نوع البرجر
  const [burgerTypeModal, setBurgerTypeModal] = useState<{item: any, section: string} | null>(null);
  // حالة نافذة إضافة تعليق
  const [commentModal, setCommentModal] = useState<{item: any, section: string} | null>(null);
  const [commentInput, setCommentInput] = useState("");

  // إضافة للسلة مع اختيار نوع البرجر
  function handleAddBurger(item: any, section: string) {
    setBurgerTypeModal({ item, section });
  }
  function confirmBurgerType(type: 'beef' | 'chicken') {
    if (!burgerTypeModal) return;
    const { item, section } = burgerTypeModal;
    const name = `${item.name} - ${type === 'beef' ? 'لحم' : 'فراخ'}`;
    const price = item[type];
    setBurgerTypeModal(null);
    setCommentModal({ item: { name, price, type: section }, section });
    setCommentInput("");
  }
  // إضافة للسلة مع تعليق
  function handleAddToCartWithComment(item: any, section?: string) {
    setCommentModal({ item, section: section || item.type });
    setCommentInput("");
  }
  function confirmAddToCartWithComment() {
    if (!commentModal) return;
    addToCart({ ...commentModal.item, comment: commentInput });
    setCommentModal(null);
    setCommentInput("");
  }
  function editComment(name: string, newComment: string) {
    setCart(c => c.map(i => i.name === name ? { ...i, comment: newComment } : i));
  }

  return (
    <div className={`min-h-screen flex flex-col items-center py-4 px-1 font-sans ${mainGradient}`} style={{backdropFilter: 'blur(2px)', background: undefined}} dir='rtl'>
      {/* إشعار */}
      {notification && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-lg text-lg animate-bounce ${darkText} bg-[#333]`}>{notification}</div>
      )}
      <div className={`w-full max-w-2xl relative flex flex-col gap-6 sm:gap-8 rounded-3xl shadow-2xl p-1 sm:p-4 md:p-8 border border-[#ffd700]/40 ${darkText}`} style={{backdropFilter: 'blur(6px)', background: darkSection}}>
        {/* هيدر احترافي في أعلى الصفحة */}
        <header className={`w-full max-w-2xl mx-auto flex items-center justify-between gap-1 sm:gap-2 px-1 sm:px-2 py-2 sm:py-3 rounded-2xl shadow-lg border border-[#ffd700]/40 mb-4 sticky top-0 z-50 ${darkText}`} style={{backdropFilter: 'blur(6px)', background: darkSection}}>
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={Logo} alt="Charcoals Logo" className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-2xl border-2 border-[#fbbf24] bg-white/80 rounded-full" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-2xl font-extrabold tracking-wider text-[#b91c1c]">شاركلز  بورتسودان</span>
              <span className="text-xs sm:text-sm md:text-base text-[#f59e42] font-bold">Charcoals - Portsudan</span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setShowFavs(f => !f)} className={`bg-[#f59e42] hover:bg-[#d32f2f] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg text-xl sm:text-2xl transition ${showFavs ? 'ring-4 ring-[#ffd700]/40' : ''}`}>❤️</button>
            <button onClick={() => setShowCart(true)} className="relative bg-[#f59e42] hover:bg-[#d32f2f] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg text-xl sm:text-2xl transition" title="سلة الطلبات">
              <span role="img" aria-label="cart">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-[#d32f2f] text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-white">{cartCount}</span>
              )}
            </button>
          </div>
        </header>
        <div className="flex flex-col items-center gap-2 mb-2">
          {/* إزالة الشعار من داخل الصفحة الرئيسية (يظهر فقط في الهيدر) */}
          {/* <img src={Logo} alt="Charcoals Logo" className="w-24 h-24 object-contain drop-shadow-2xl border-4 border-[#fbbf24] bg-white/80 rounded-full" /> */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-wider drop-shadow-lg" style={{color: '#d32f2f', letterSpacing: '2px'}}>قائمة طعام شاركلز</h1>
          <span className="text-lg md:text-xl text-[#f59e42] font-bold drop-shadow-sm">Charcoals - Portsudan </span>
        </div>
        {/* البحث والفلترة */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between w-full">
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex flex-row gap-2 w-full sm:w-auto justify-center">
            <FilterTabs active={filter} onChange={setFilter} />
          </div>
        </div>
        {/* قسم المفضلة */}
        {showFavs && favorites.length > 0 && (
          <Section title="المفضلة" icon="⭐" color="border-[#f59e42] bg-[#fffbe7]">
            {favorites.map(name => {
              const item = allItems.find(i => i.name === name);
              if (!item) return null;
              return (
                <li key={item.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-dashed pb-3 last:border-b-0 bg-[#fff8f1] rounded-xl px-2 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-2">
                    <FavoriteButton active={true} onClick={() => toggleFavorite(item.name)} />
                    <span className="text-lg font-semibold text-black">{item.name}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0 flex-wrap">
                    {('beef' in item && 'chicken' in item) ? (
                      <span className="text-base font-bold text-black">لحمة: {item.beef} | فراخ: {item.chicken} جنيه</span>
                    ) : (
                      <span className="text-base font-bold text-black">{item.price} جنيه</span>
                    )}
                    <button className="px-3 py-1 rounded-lg bg-[#f59e42] text-white text-base font-bold shadow-lg transition hover:bg-[#d32f2f] hover:scale-105 flex items-center justify-center" onClick={() => addToCart(item)} title="أضف للسلة">
                      <span role="img" aria-label="cart" className="text-white"><img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/shopping-cart.png" alt="shopping-cart"/></span>
                    </button>
                  </div>
                </li>
              );
            })}
          </Section>
        )}
        {/* عرض الأصناف مفصولة */}
        {(filter === "all" || filter === "sandwiches") && (
          <Section title="السندوتشات" icon="🥪" color="border-[#d32f2f] bg-[#fff3e0]">
            {sandwiches.filter(item => (filter === "all" || filter === "sandwiches") && (search === "" || item.name.includes(search))).map(item => (
              <li key={item.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-dashed pb-3 last:border-b-0 bg-[#fff8f1] rounded-xl px-2 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2">
                  <FavoriteButton active={favorites.includes(item.name)} onClick={() => toggleFavorite(item.name)} />
                  <span className="text-lg font-semibold text-black">{item.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0 flex-wrap">
                  <span className="text-base font-bold  text-black">لحمة: {item.beef} | فراخ: {item.chicken} جنيه</span>
                    {/* <p className=" block bg-[#f59e42] text-black p-1 rounded-lg">{item.content}</p> */}
                  <button className="px-3 py-1 rounded-lg bg-[#f59e42] text-white text-base font-bold shadow-lg transition hover:bg-[#d32f2f] hover:scale-105 flex items-center justify-center" onClick={() => handleAddBurger(item, 'sandwiches')} title="أضف للسلة">
                    <span role="img" aria-label="cart"><img width="22" height="22" src="https://img.icons8.com/glyph-neue/64/shopping-cart.png" alt="shopping-cart"/></span>
                  </button>
                </div>
              </li>
            ))}
          </Section>
        )}
        {(filter === "all" || filter === "combos") && (
          <Section title="الكومبو" icon="🍔" color="border-[#f59e42] bg-[#fffbe7]">
            {combos.filter(item => (filter === "all" || filter === "combos") && (search === "" || item.name.includes(search))).map(item => (
              <li key={item.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-dashed pb-3 last:border-b-0 bg-[#fff8f1] rounded-xl px-2 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2">
                  <FavoriteButton active={favorites.includes(item.name)} onClick={() => toggleFavorite(item.name)} />
                  <span className="text-lg font-semibold text-black">{item.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0 flex-wrap">
                  <span className="text-base font-bold text-black">لحمة: {item.beef} | فراخ: {item.chicken} جنيه</span>
                  <button className="px-3 py-1 rounded-lg bg-[#f59e42] text-white text-base font-bold shadow-lg transition hover:bg-[#d32f2f] hover:scale-105 flex items-center justify-center" onClick={() => handleAddBurger(item, 'combos')} title="أضف للسلة">
                    <span role="img" aria-label="cart"><img width="22" height="22" src="https://img.icons8.com/glyph-neue/64/shopping-cart.png" alt="shopping-cart"/></span>
                  </button>
                </div>
              </li>
            ))}
          </Section>
        )}
        {(filter === "all" || filter === "extras") && (
          <Section title="الإضافات" icon="🧀" color="border-[#f59e42] bg-[#fffbe7]">
            {extras.filter(item => (filter === "all" || filter === "extras") && (search === "" || item.name.includes(search))).map(item => (
              <li key={item.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-dashed pb-3 last:border-b-0 bg-[#fff8f1] rounded-xl px-2 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2">
                  <FavoriteButton active={favorites.includes(item.name)} onClick={() => toggleFavorite(item.name)} />
                  <span className="text-lg font-semibold text-black">{item.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0 flex-wrap">
                  <span className="text-base font-bold text-black">{item.price} جنيه</span>
                  <button className="px-3 py-1 rounded-lg bg-[#f59e42] text-white text-base font-bold shadow-lg transition hover:bg-[#d32f2f] hover:scale-105 flex items-center justify-center" onClick={() => addToCart(item)} title="أضف للسلة">
                    <span role="img" aria-label="cart"><img width="22" height="22" src="https://img.icons8.com/glyph-neue/64/shopping-cart.png" alt="shopping-cart"/></span>
                  </button>
                </div>
              </li>
            ))}
          </Section>
        )}
        {(filter === "all" || filter === "chips") && (
          <Section title="الشيبس" icon="🍟" color="border-[#f59e42] bg-[#fffbe7]">
            {chips.filter(item => (filter === "all" || filter === "chips") && (search === "" || item.name.includes(search))).map(item => (
              <li key={item.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-dashed pb-3 last:border-b-0 bg-[#fff8f1] rounded-xl px-2 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2">
                  <FavoriteButton active={favorites.includes(item.name)} onClick={() => toggleFavorite(item.name)} />
                  <span className="text-lg font-semibold text-black">{item.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0 flex-wrap">
                  <span className="text-base font-bold text-black">{item.price} جنيه</span>
                  <button className="px-3 py-1 rounded-lg bg-[#f59e42] text-white text-base font-bold shadow-lg transition hover:bg-[#d32f2f] hover:scale-105 flex items-center justify-center" onClick={() => addToCart(item)} title="أضف للسلة">
                                       <span role="img" aria-label="cart"><img width="22" height="22" src="https://img.icons8.com/glyph-neue/64/shopping-cart.png" alt="shopping-cart"/></span>
                  </button>
                </div>
              </li>
            ))}
          </Section>
        )}
        {(filter === "all" || filter === "drinks") && (
          <Section title="المشروبات" icon="🥤" color="border-[#d32f2f] bg-[#fff3e0]">
            {drinks.filter(item => (filter === "all" || filter === "drinks") && (search === "" || item.name.includes(search))).map(item => (
              <li key={item.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-dashed pb-3 last:border-b-0 bg-[#fff8f1] rounded-xl px-2 hover:scale-[1.01] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2">
                  <FavoriteButton active={favorites.includes(item.name)} onClick={() => toggleFavorite(item.name)} />
                  <span className="text-lg font-semibold text-black">{item.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 md:mt-0 flex-wrap">
                  <span className="text-base font-bold text-black">{item.price} جنيه</span>
                  <button className="px-3 py-1 rounded-lg bg-[#f59e42] text-white text-base font-bold shadow-lg transition hover:bg-[#d32f2f] hover:scale-105 flex items-center justify-center" onClick={() => addToCart(item)} title="أضف للسلة">
                    <span role="img" aria-label="cart"><img width="22" height="22" src="https://img.icons8.com/glyph-neue/64/shopping-cart.png" alt="shopping-cart"/></span>
                  </button>
                </div>
              </li>
            ))}
          </Section>
        )}
        {/* سلة احترافية */}
        {showCart && (
          <div className="fixed inset-0 bg-black/40 flex items-start pt-24 justify-center z-50">
            <div className={`rounded-2xl shadow-2xl p-3 sm:p-6 w-full max-w-md relative animate-fadeIn ${darkText} bg-white/90`}> 
              <button className="absolute top-2 left-2 text-[#d32f2f] text-2xl font-bold" onClick={() => setShowCart(false)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#d32f2f]">
                <span>سلة الطلبات</span> <span className="text-2xl">🛒</span>
              </h2>
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 py-8">السلة فارغة</div>
              ) : (
                <ul className="mb-4 divide-y divide-dashed divide-[#f59e42]">
                  {cart.map((item, idx) => (
                    <li key={idx} className="flex flex-col gap-1 py-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-black">{item.name}</span>
                        <span className="text-black font-bold">{(item.price || item.beef || 0) * (item.qty || 1)} جنيه</span>
                      </div>
                      {typeof item.comment === 'string' && (
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="text-black">ملاحظة:</span>
                          <input
                            className="border rounded px-2 py-0.5 text-xs w-full max-w-[180px]"
                            value={item.comment}
                            onChange={e => editComment(item.name, e.target.value)}
                            placeholder="تعليق للمنتج..."
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs text-gray-600 gap-2">
                        <span className="text-black">{'الكمية: '}
                          <button className="mx-1 px-2 py-0.5 bg-[#ffd700] text-[#222] rounded" onClick={() => changeQty(item.name, (item.qty || 1) - 1)} disabled={item.qty <= 1}>-</button>
                          <span className="inline-block w-6 text-center">{item.qty || 1}</span>
                          <button className="mx-1 px-2 py-0.5 bg-[#ffd700] text-[#222] rounded" onClick={() => changeQty(item.name, (item.qty || 1) + 1)}>+</button>
                        </span>
                        <span className="text-black">{'سعر الوحدة: '}{item.price || item.beef || 0} جنيه</span>
                        <button className="ml-2 px-2 py-0.5 bg-[#d32f2f] text-white rounded" onClick={() => removeFromCart(item.name)}>حذف</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="font-bold text-lg mb-4 text-black">{'الإجمالي: '}<span className="text-black">{total}</span> جنيه</div>
              <button className="w-full py-2 rounded-lg bg-[#d32f2f] text-white font-bold text-lg shadow hover:bg-[#f59e42] transition" onClick={handleOrder}>{'إتمام الطلب'}</button>
            </div>
          </div>
        )}
      </div>
      {/* زر القلب العلوي لعرض المفضلة */}
      {/* <div className="fixed top-4 right-4 z-50">
        <button onClick={() => setShowFavs(f => !f)} className="bg-[#f59e42] hover:bg-[#d32f2f] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-2xl transition">
          <span role="img" aria-label="favorites">❤️</span>
        </button>
      </div> */}
      {/* قسم التواصل */}
      <div className={`w-full max-w-2xl mt-8 sm:mt-10 mb-2 p-2 sm:p-4 rounded-xl border border-[#ffd700] text-center ${darkText} bg-[#23232a]`} > 
        <h2 className="text-xl font-bold mb-2">تواصل معنا</h2>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
          <a href={callLink()} className={`px-4 py-2 rounded-lg font-bold shadow transition ${darkText} bg-[#f59e42] text-white hover:bg-[#d32f2f]`}>اتصل بنا</a>
          <a href={waLink('')} className={`px-4 py-2 rounded-lg font-bold shadow transition ${darkText} bg-[#25d366] text-white hover:bg-[#128c7e]`}>WhatsApp</a>
        </div>
        <div className={`mt-2 text-xs sm:text-sm  text-white/80`}>العنوان: بورتسودان - شارع جامعه البحر الاحمر</div>
      </div>
      {/* نافذة اختيار نوع البرجر */}
      {burgerTypeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start pt-24 justify-center z-[9999]">
          <div className="bg-white/90 rounded-2xl shadow-2xl p-6 w-full max-w-xs flex flex-col items-center relative">
            {/* زر إغلاق دائري في الأعلى يمين */}
            <button className="absolute top-3 right-3 bg-[#f59e42] hover:bg-[#d32f2f] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-xl transition" onClick={() => setBurgerTypeModal(null)} title="إغلاق">
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-[#d32f2f]">اختر نوع الطلب</h3>
            <div className="flex gap-4 mb-2 w-full justify-center">
              <button className="flex-1 px-0 py-3 rounded-lg bg-[#d32f2f] text-white font-bold text-lg shadow hover:bg-[#f59e42] transition" style={{minWidth:'100px'}} onClick={() => confirmBurgerType('beef')}>لحم</button>
              <button className="flex-1 px-0 py-3 rounded-lg bg-[#f59e42] text-white font-bold text-lg shadow hover:bg-[#d32f2f] transition" style={{minWidth:'100px'}} onClick={() => confirmBurgerType('chicken')}>فراخ</button>
            </div>
          </div>
        </div>
      )}
      {/* نافذة إدخال التعليق عند الإضافة للسلة */}
      {commentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start pt-24 justify-center z-[9999]">
          <div className="bg-white/90 rounded-2xl shadow-2xl p-6 w-full max-w-xs flex flex-col items-center relative">
            <button className="absolute top-3 right-3 bg-[#f59e42] hover:bg-[#d32f2f] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-xl transition" onClick={() => setCommentModal(null)} title="إغلاق">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-[#d32f2f]">أضف ملاحظة للمنتج (اختياري)</h3>
            <input
              className="border rounded px-3 py-2 mb-4 w-full text-base"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="مثال: بدون صوص، زيادة جبنة..."
              autoFocus
            />
            <button className="w-full py-2 rounded-lg bg-[#d32f2f] text-white font-bold text-lg shadow hover:bg-[#f59e42] transition" onClick={confirmAddToCartWithComment}>تأكيد الإضافة</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

// tsconfig settings for React/JSX
// تأكد من تفعيل دعم JSX و React في TypeScript
// في tsconfig.json:
//   "jsx": "react-jsx",
//   "jsxImportSource": "react",
//   "allowJs": true,
//   "esModuleInterop": true,

// ترجمة إنجليزية لكل النصوص:
// - قائمة طعام شاركلز => Charcoals Menu
// - Port Sudan - Since 2017 => Port Sudan - Since 2017
// - البحث => Search
// - الفلترة => Filter
// - المفضلة => Favorites
// - سلة الطلبات => Cart
// - سندوتشات => Sandwiches
// - كومبو => Combos
// - إضافات => Extras
// - شيبس => Chips
// - مشروبات => Drinks
// - لحمة => Beef
// - فراخ => Chicken
// - جنيه => SDG
// - الكمية => Qty
// - سعر الوحدة => Unit Price
// - حذف => Remove
// - إتمام الطلب => Order Now
// - السلة فارغة => Cart is empty
// - الإجمالي => Total
// - تواصل معنا => Contact Us
// - اتصل بنا => Call Us
// - العنوان => Address
// - نهاري/ليلي => Light/Dark
