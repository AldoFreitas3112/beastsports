import { useState } from "react";
import { Heart, ShoppingCart, Star, Filter, Eye } from "lucide-react";
import MobileProductCard from "./MobileProductCard";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ProductGrid = ({ addToCart, toggleFavorite, favorites, setCurrentView }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "Todos os Produtos" },
    { id: "camisas", name: "Camisas" },
    { id: "camisetas", name: "Camisetas" },
    { id: "shorts", name: "Shorts" },
    { id: "calcas", name: "Calças" },
    { id: "tenis", name: "Tênis" },
    { id: "acessorios", name: "Acessórios" }
  ];

  const filteredProducts = products
    .filter(product => 
      selectedCategory === "all" || product.category === selectedCategory
    )
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

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
          
          {/* Mobile Filters */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="name">Nome</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Avaliação</option>
              </select>
            </div>
          </div>

          {/* Mobile Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {sortedProducts.map(product => (
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
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className="w-1/4">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </h2>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Categoria</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? "bg-green-100 text-green-800"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Faixa de Preço</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      R$ {priceRange[0]} - R$ {priceRange[1]}
                    </p>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Ordenar por</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="name">Nome</option>
                    <option value="price-low">Menor Preço</option>
                    <option value="price-high">Maior Preço</option>
                    <option value="rating">Avaliação</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Nossos Produtos</h1>
                <p className="text-gray-600">{sortedProducts.length} produtos encontrados</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => {
                  const isFavorite = favorites.some(fav => fav.id === product.id);
                  
                  return (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
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

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Nenhum produto encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
