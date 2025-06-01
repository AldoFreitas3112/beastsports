
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import MobileNavigation from "./MobileNavigation";

interface MobileHeaderProps {
  setCurrentView: (view: string) => void;
  cartItemsCount: number;
  user: any;
  setUser: (user: any) => void;
}

const MobileHeader = ({ setCurrentView, cartItemsCount, user, setUser }: MobileHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-lg">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setCurrentView("home")}
        >
          <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            BEAST SPORTS
          </div>
        </div>

        {/* Cart Icon */}
        <button
          onClick={() => setCurrentView("cart")}
          className="relative p-2 text-gray-700"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
          <Search className="h-4 w-4 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
      </div>

      <MobileNavigation 
        setCurrentView={setCurrentView}
        cartItemsCount={cartItemsCount}
        user={user}
        setUser={setUser}
      />
    </header>
  );
};

export default MobileHeader;
