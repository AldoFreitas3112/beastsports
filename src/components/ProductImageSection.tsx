
import { Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductImageSectionProps {
  product: Product;
  isFavorite: boolean;
  toggleFavorite: (product: Product) => void;
}

const ProductImageSection = ({ product, isFavorite, toggleFavorite }: ProductImageSectionProps) => {
  return (
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg"
      />
      
      <button
        onClick={() => toggleFavorite(product)}
        className={`absolute top-4 right-4 p-3 rounded-full ${
          isFavorite 
            ? "bg-red-500 text-white" 
            : "bg-white text-gray-600"
        } shadow-lg hover:scale-110 transition-transform`}
      >
        <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
      </button>
    </div>
  );
};

export default ProductImageSection;
