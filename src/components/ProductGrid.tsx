
import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";

const ProductGrid = ({ addToCart, toggleFavorite, favorites, featured = false, setCurrentView }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {featured ? "Produtos em Destaque" : "Nossos Produtos"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva de equipamentos esportivos. 
            Qualidade premium para performance máxima.
          </p>
        </div>

        {!featured && (
          <ProductFilters
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onPriceRangeChange={setPriceRange}
            onSortChange={setSortBy}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => {
            const isFavorite = favorites.some(fav => fav.id === product.id);
            
            return (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                onViewProduct={setCurrentView}
              />
            );
          })}
        </div>

        {featured && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentView("products")}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 text-lg"
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
