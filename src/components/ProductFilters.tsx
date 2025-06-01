
import { Filter } from "lucide-react";
import { categories, priceRanges } from "@/data/products";

interface ProductFiltersProps {
  selectedCategory: string;
  priceRange: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: string) => void;
  onSortChange: (sort: string) => void;
}

const ProductFilters = ({
  selectedCategory,
  priceRange,
  sortBy,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange
}: ProductFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-4 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <span className="font-semibold text-gray-800">Filtros</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
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
            onChange={(e) => onPriceRangeChange(e.target.value)}
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
            onChange={(e) => onSortChange(e.target.value)}
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
  );
};

export default ProductFilters;
