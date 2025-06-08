
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import MobileProductCard from "./MobileProductCard";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ProductGrid = ({ addToCart, toggleFavorite, favorites, setCurrentView }) => {
  const { toast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleToggleFavorite = (product) => {
    toggleFavorite(product);
    const isFavorite = favorites.some(fav => fav.id === product.id);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${product.name} ${isFavorite ? "foi removido dos" : "foi adicionado aos"} favoritos.`,
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Nossos Produtos</h1>
          
          {/* Mobile Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {products.map(product => (
              <MobileProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.some(fav => fav.id === product.id)}
                addToCart={handleAddToCart}
                toggleFavorite={handleToggleFavorite}
                setCurrentView={setCurrentView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Nossos Produtos</h1>
            <p className="text-gray-600">{products.length} produtos encontrados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => {
              const isFavorite = favorites.some(fav => fav.id === product.id);
              
              return (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-contain bg-gray-50 group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <button
                      onClick={() => setCurrentView(`product-${product.id}`)}
                      className="absolute top-4 right-12 p-2 bg-white/90 text-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={() => handleToggleFavorite(product)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                        isFavorite 
                          ? "bg-red-500 text-white" 
                          : "bg-white/90 text-gray-600 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h3 
                      className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-green-600"
                      onClick={() => setCurrentView(`product-${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    
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
                      <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Carrinho</span>
                      </button>
                      <button
                        onClick={() => setCurrentView(`product-${product.id}`)}
                        className="px-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Nenhum produto encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
