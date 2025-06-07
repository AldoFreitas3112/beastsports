
import { ArrowLeft, ShoppingCart, User } from "lucide-react";

interface ProductHeaderProps {
  setCurrentView: (view: string) => void;
}

const ProductHeader = ({ setCurrentView }: ProductHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => setCurrentView("home")}
          className="text-gray-600 hover:text-green-600"
        >
          Início
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView("cart")}
            className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentView("login")}
            className="p-2 text-gray-700 hover:text-green-600 transition-colors"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
