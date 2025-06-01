
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  description: string;
}

interface MobileProductCardProps {
  product: Product;
  isFavorite: boolean;
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  setCurrentView: (view: string) => void;
}

const MobileProductCard = ({ 
  product, 
  isFavorite, 
  addToCart, 
  toggleFavorite, 
  setCurrentView 
}: MobileProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        <button
          onClick={() => setCurrentView(`product-${product.id}`)}
          className="absolute top-2 right-12 p-2 bg-white/90 text-gray-600 rounded-full"
        >
          <Eye className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => toggleFavorite(product)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite 
              ? "bg-red-500 text-white" 
              : "bg-white/90 text-gray-600"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 
          className="font-bold text-base text-gray-800 mb-2 line-clamp-2 cursor-pointer"
          onClick={() => setCurrentView(`product-${product.id}`)}
        >
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Carrinho</span>
          </button>
          <button
            onClick={() => setCurrentView(`product-${product.id}`)}
            className="px-4 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium text-sm"
          >
            Ver
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
