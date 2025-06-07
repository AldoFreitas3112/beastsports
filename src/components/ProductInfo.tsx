
import { Star } from "lucide-react";

interface Product {
  name: string;
  description: string;
  rating: number;
  price: number;
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(product.rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-gray-600 ml-2">({product.rating})</span>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <span className="text-3xl font-bold text-green-600">
          R$ {product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
