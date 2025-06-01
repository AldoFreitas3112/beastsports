
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  description: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onViewProduct: (productId: string) => void;
}

const ProductCard = ({ 
  product, 
  isFavorite, 
  onAddToCart, 
  onToggleFavorite, 
  onViewProduct 
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        
        <button
          onClick={() => onViewProduct(`product-${product.id}`)}
          className="absolute top-4 right-12 p-2 bg-white/80 text-gray-600 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onToggleFavorite(product)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isFavorite 
              ? "bg-red-500 text-white" 
              : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
      
      <div className="p-6">
        <h3 
          className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors cursor-pointer"
          onClick={() => onViewProduct(`product-${product.id}`)}
        >
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-green-600">
            R$ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2 group"
          >
            <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Carrinho</span>
          </button>
          <button
            onClick={() => onViewProduct(`product-${product.id}`)}
            className="px-4 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
          >
            Ver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
