import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import MobileHeader from "./MobileHeader";

const Header = ({ setCurrentView, cartItemsCount, user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
  };

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader 
        setCurrentView={setCurrentView}
        cartItemsCount={cartItemsCount}
        user={user}
        setUser={setUser}
      />

      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView("home")}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                BEAST SPORTS
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentView("home")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView("products")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Produtos
              </button>
              <button
                onClick={() => setCurrentView("about")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => setCurrentView("contact")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Contato
              </button>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
              <Search className="h-4 w-4 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={() => setCurrentView("cart")}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-green-600 transition-colors">
                    <User className="h-6 w-6" />
                    <span className="hidden md:block text-sm">{user.name}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 bg-white border shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={() => setCurrentView("account")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Minha Conta
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentView("login")}
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-green-600"
                  />
                </div>
                <button
                  onClick={() => {
                    setCurrentView("home");
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-green-600 font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentView("products");
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-green-600 font-medium"
                >
                  Produtos
                </button>
                <button
                  onClick={() => {
                    setCurrentView("about");
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-green-600 font-medium"
                >
                  Sobre Nós
                </button>
                <button
                  onClick={() => {
                    setCurrentView("contact");
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-green-600 font-medium"
                >
                  Contato
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
