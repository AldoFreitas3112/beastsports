import { useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";

const ProductDetails = ({ productId, setCurrentView, addToCart, toggleFavorite, favorites }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Preto");
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(productId));

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
            {/* Product Image */}
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

            {/* Product Info */}
            <div className="space-y-6">
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
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              {/* Size Selection */}
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

              {/* Color Selection */}
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

              {/* Quantity */}
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

              {/* Action Buttons */}
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
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t">
            <Tabs defaultValue="description" className="p-8">
              <TabsList>
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="specifications">Especificações</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <p className="text-gray-600 leading-relaxed">
                  {product.fullDescription}
                </p>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Material:</span>
                    <span>{product.specifications.material}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Peso:</span>
                    <span>{product.specifications.peso}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Origem:</span>
                    <span>{product.specifications.origem}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Cuidados:</span>
                    <span>{product.specifications.cuidados}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-medium">João Silva</span>
                    </div>
                    <p className="text-gray-600">Produto excelente! Qualidade top e entrega rápida.</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium">Maria Santos</span>
                    </div>
                    <p className="text-gray-600">Muito bom, recomendo! Tecido de qualidade.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
