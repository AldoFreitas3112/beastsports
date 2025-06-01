import { useState } from "react";
import { Heart, ShoppingCart, Star, Filter, Eye } from "lucide-react";
import MobileProductCard from "./MobileProductCard";

const ProductGrid = ({ addToCart, toggleFavorite, favorites, featured = false, setCurrentView }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const products = [
    {
      id: 1,
      name: "Camisa Beast Sports Preta",
      price: 89.90,
      originalPrice: 129.90,
      image: "/lovable-uploads/11557640-2ba5-4836-9c46-ad815453cf21.png",
      category: "camisas",
      brand: "Beast Sports",
      rating: 4.8,
      description: "Camisa esportiva premium com tecnologia dri-fit e design exclusivo Beast Sports. Ideal para treinos e competições.",
      discount: 31
    },
    {
      id: 2,
      name: "Camisa Beast Sports Branca",
      price: 89.90,
      originalPrice: 129.90,
      image: "/lovable-uploads/db9c9924-3608-4501-8e6f-f5340b6b9ad3.png",
      category: "camisas",
      brand: "Beast Sports",
      rating: 4.9,
      description: "Camisa esportiva branca com detalhes pretos e logo Beast Sports. Tecido respirável e ajuste perfeito.",
      discount: 31
    },
    {
      id: 3,
      name: "Camiseta Beast Sports Preta",
      price: 69.90,
      originalPrice: 99.90,
      image: "/lovable-uploads/4e4ff565-7c7f-44e2-9031-680ad2a4a73b.png",
      category: "camisetas",
      brand: "Beast Sports",
      rating: 4.7,
      description: "Camiseta casual Beast Sports com logo estilizado. Conforto e estilo para o dia a dia do atleta.",
      discount: 30
    },
    {
      id: 4,
      name: "Camiseta Beast Sports Branca",
      price: 69.90,
      originalPrice: 99.90,
      image: "/lovable-uploads/9dc30637-25c7-4819-b87e-579d8300af91.png",
      category: "camisetas",
      brand: "Beast Sports",
      rating: 4.6,
      description: "Camiseta branca premium com logo Beast Sports em preto. Versatilidade e qualidade em uma peça única.",
      discount: 30
    }
  ];

  const categories = [
    { value: "all", label: "Todos" },
    { value: "camisas", label: "Camisas" },
    { value: "camisetas", label: "Camisetas" },
    { value: "shorts", label: "Shorts" },
    { value: "calcados", label: "Calçados" }
  ];

  const priceRanges = [
    { value: "all", label: "Todos os preços" },
    { value: "0-50", label: "Até R$ 50" },
    { value: "50-100", label: "R$ 50 - R$ 100" },
    { value: "100-200", label: "R$ 100 - R$ 200" },
    { value: "200+", label: "Acima de R$ 200" }
  ];

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
      
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (max) {
          if (product.price < min || product.price > max) return false;
        } else {
          if (product.price < min) return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
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

  const displayedProducts = featured ? filteredProducts.slice(0, 4) : filteredProducts;

  return (
    <section className="py-8 md:py-16 bg-gray-50 pt-32 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {featured ? "Produtos em Destaque" : "Nossos Produtos"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Descubra nossa coleção exclusiva de equipamentos esportivos. 
            Qualidade premium para performance máxima.
          </p>
        </div>

        {/* Mobile Filters */}
        {!featured && (
          <div className="md:hidden bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="font-semibold text-gray-800 text-sm">Filtros</span>
            </div>
            
            <div className="space-y-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="name">Nome</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="rating">Melhor avaliação</option>
              </select>
            </div>
          </div>
        )}

        {/* Desktop Filters */}
        {!featured && (
          <div className="hidden md:block bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-800">Filtros</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="name">Nome</option>
                  <option value="price-low">Menor preço</option>
                  <option value="price-high">Maior preço</option>
                  <option value="rating">Melhor avaliação</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Product Grid */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {displayedProducts.map((product) => {
            const isFavorite = favorites.some(fav => fav.id === product.id);
            
            return (
              <MobileProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                setCurrentView={setCurrentView}
              />
            );
          })}
        </div>

        {/* Desktop Product Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => {
            const isFavorite = favorites.some(fav => fav.id === product.id);
            
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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
                    onClick={() => setCurrentView(`product-${product.id}`)}
                    className="absolute top-4 right-12 p-2 bg-white/80 text-gray-600 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => toggleFavorite(product)}
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
                    onClick={() => setCurrentView(`product-${product.id}`)}
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
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>Carrinho</span>
                    </button>
                    <button
                      onClick={() => setCurrentView(`product-${product.id}`)}
                      className="px-4 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {featured && (
          <div className="text-center mt-8 md:mt-12">
            <button 
              onClick={() => setCurrentView("products")}
              className="bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 text-base md:text-lg"
            >
              Ver Todos os Produtos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
