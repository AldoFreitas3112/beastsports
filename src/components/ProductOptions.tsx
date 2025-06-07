
import { Plus, Minus } from "lucide-react";

interface Product {
  sizes: string[];
  colors: string[];
}

interface ProductOptionsProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  setSelectedSize: (size: string) => void;
  setSelectedColor: (color: string) => void;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

const ProductOptions = ({
  product,
  selectedSize,
  selectedColor,
  quantity,
  setSelectedSize,
  setSelectedColor,
  decreaseQuantity,
  increaseQuantity
}: ProductOptionsProps) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-3">Tamanho</h3>
        <div className="flex space-x-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-lg font-medium ${
                selectedSize === size
                  ? "border-green-600 bg-green-50 text-green-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Cor</h3>
        <div className="flex space-x-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-lg font-medium ${
                selectedColor === color
                  ? "border-green-600 bg-green-50 text-green-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Quantidade</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={decreaseQuantity}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-xl font-semibold px-4">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductOptions;
