
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useProductReviews } from "@/hooks/useProductReviews";
import ProductHeader from "@/components/ProductHeader";
import ProductImageSection from "@/components/ProductImageSection";
import ProductInfo from "@/components/ProductInfo";
import ProductOptions from "@/components/ProductOptions";
import ProductActions from "@/components/ProductActions";
import ProductTabs from "@/components/ProductTabs";

const ProductDetails = ({ productId, setCurrentView, addToCart, toggleFavorite, favorites }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Preto");
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(productId));
  const { reviews, loading, submitting, submitReview } = useProductReviews(parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Produto não encontrado</p>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    addToCart(productWithOptions);
  };

  const handleBuyNow = () => {
    setCurrentView(`checkout-product-${product.id}-${quantity}-${selectedSize}`);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <ProductHeader setCurrentView={setCurrentView} />

      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => setCurrentView("products")}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar aos produtos</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <ProductImageSection
              product={product}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />

            <div className="space-y-6">
              <ProductInfo product={product} />
              
              <ProductOptions
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                quantity={quantity}
                setSelectedSize={setSelectedSize}
                setSelectedColor={setSelectedColor}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
              />

              <ProductActions
                handleBuyNow={handleBuyNow}
                handleAddToCart={handleAddToCart}
              />
            </div>
          </div>

          <ProductTabs
            product={product}
            reviews={reviews}
            loading={loading}
            submitting={submitting}
            submitReview={submitReview}
            setCurrentView={setCurrentView}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
