import { useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetails = ({ productId, setCurrentView, addToCart, toggleFavorite, favorites }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isBuying, setIsBuying] = useState(false);

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
      discount: 31,
      fullDescription: "Esta camisa esportiva da Beast Sports é confeccionada com tecido de alta performance que oferece máximo conforto e respirabilidade. Com tecnologia dri-fit avançada, mantém o corpo seco durante os treinos mais intensos. O design moderno em preto com detalhes exclusivos da marca faz desta peça um item indispensável para atletas que buscam estilo e funcionalidade.",
      specifications: {
        material: "100% Poliéster com tecnologia Dri-Fit",
        peso: "150g",
        origem: "Brasil",
        cuidados: "Lavar à máquina em água fria, não usar alvejante"
      },
      sizes: ["P", "M", "G", "GG", "XG"],
      colors: ["Preto"]
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
      discount: 31,
      fullDescription: "Camisa esportiva em branco com detalhes em preto, apresentando o logo icônico da Beast Sports. Fabricada com materiais de primeira linha, oferece ajuste anatômico perfeito e máxima liberdade de movimento. Ideal para treinos, jogos e uso casual.",
      specifications: {
        material: "100% Poliéster com tecnologia Dri-Fit",
        peso: "150g",
        origem: "Brasil",
        cuidados: "Lavar à máquina em água fria, não usar alvejante"
      },
      sizes: ["P", "M", "G", "GG", "XG"],
      colors: ["Branco"]
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
      discount: 30,
      fullDescription: "Camiseta casual da Beast Sports em algodão premium, perfeita para o dia a dia. Com logo estilizado e corte moderno, combina conforto excepcional com design arrojado. Uma peça versátil que pode ser usada em diversas ocasiões.",
      specifications: {
        material: "100% Algodão Premium",
        peso: "180g",
        origem: "Brasil",
        cuidados: "Lavar à máquina em água morna, pode usar secadora"
      },
      sizes: ["P", "M", "G", "GG", "XG"],
      colors: ["Preto"]
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
      discount: 30,
      fullDescription: "Camiseta branca premium da Beast Sports com logo em preto, oferecendo versatilidade máxima para qualquer situação. Confeccionada em algodão de alta qualidade, proporciona conforto duradouro e estilo atemporal.",
      specifications: {
        material: "100% Algodão Premium",
        peso: "180g",
        origem: "Brasil",
        cuidados: "Lavar à máquina em água morna, pode usar secadora"
      },
      sizes: ["P", "M", "G", "GG", "XG"],
      colors: ["Branco"]
    }
  ];

  const product = products.find(p => p.id === parseInt(productId));
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h2>
          <button
            onClick={() => setCurrentView("products")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Voltar aos Produtos
          </button>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === product.id);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, selectedSize });
    }
  };

  const handleBuyNow = () => {
    setIsBuying(true);
    // Simular processo de compra direta
    setTimeout(() => {
      setIsBuying(false);
      alert("Redirecionando para o checkout...");
      // Aqui seria redirecionado para uma página de checkout ou gateway de pagamento
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView("products")}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar aos Produtos</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
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
                </div>
                <span className="text-gray-600">({product.rating})</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Tamanho</h3>
              <div className="flex space-x-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-green-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Quantidade</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 border border-gray-300 rounded-lg hover:border-green-600 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 border border-gray-300 rounded-lg hover:border-green-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              {/* Comprar Agora - Botão Principal */}
              <button
                onClick={handleBuyNow}
                disabled={isBuying}
                className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="h-6 w-6" />
                <span>{isBuying ? "Processando..." : "Comprar Agora"}</span>
              </button>
              
              {/* Adicionar ao Carrinho e Favoritos */}
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Adicionar ao Carrinho</span>
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isFavorite
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Descrição Completa</h3>
              <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-2">
                    <dt className="font-medium text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                    <dd className="text-gray-600">{value}</dd>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
