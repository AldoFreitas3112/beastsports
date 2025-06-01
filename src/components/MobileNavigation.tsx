
import { useState } from "react";
import { Menu, X, Home, ShoppingBag, Info, Phone, User, ShoppingCart } from "lucide-react";

interface MobileNavigationProps {
  setCurrentView: (view: string) => void;
  cartItemsCount: number;
  user: any;
  setUser: (user: any) => void;
}

const MobileNavigation = ({ setCurrentView, cartItemsCount, user, setUser }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
    setIsOpen(false);
  };

  const handleNavigation = (view: string) => {
    setCurrentView(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-green-600 text-white rounded-full shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 pt-20">
          <div className="space-y-4">
            <button
              onClick={() => handleNavigation("home")}
              className="w-full flex items-center space-x-3 p-4 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </button>
            
            <button
              onClick={() => handleNavigation("products")}
              className="w-full flex items-center space-x-3 p-4 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="font-medium">Produtos</span>
            </button>
            
            <button
              onClick={() => handleNavigation("about")}
              className="w-full flex items-center space-x-3 p-4 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">Sobre Nós</span>
            </button>
            
            <button
              onClick={() => handleNavigation("contact")}
              className="w-full flex items-center space-x-3 p-4 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">Contato</span>
            </button>
            
            <button
              onClick={() => handleNavigation("cart")}
              className="w-full flex items-center space-x-3 p-4 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Carrinho</span>
              {cartItemsCount > 0 && (
                <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <div className="border-t pt-4">
              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation("account")}
                    className="w-full flex items-center space-x-3 p-4 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.name}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full p-4 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation("login")}
                  className="w-full flex items-center space-x-3 p-4 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Entrar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
