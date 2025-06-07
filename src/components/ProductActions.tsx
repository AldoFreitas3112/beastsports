
import { CreditCard, ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  handleBuyNow: () => void;
  handleAddToCart: () => void;
}

const ProductActions = ({ handleBuyNow, handleAddToCart }: ProductActionsProps) => {
  return (
    <div className="space-y-3">
      <button
        onClick={handleBuyNow}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
      >
        <CreditCard className="h-5 w-5" />
        <span>Comprar Agora</span>
      </button>
      
      <button
        onClick={handleAddToCart}
        className="w-full border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Adicionar ao Carrinho</span>
      </button>
    </div>
  );
};

export default ProductActions;
