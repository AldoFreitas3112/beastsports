
export const products = [
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

export const categories = [
  { value: "all", label: "Todos" },
  { value: "camisas", label: "Camisas" },
  { value: "camisetas", label: "Camisetas" },
  { value: "shorts", label: "Shorts" },
  { value: "calcados", label: "Calçados" }
];

export const priceRanges = [
  { value: "all", label: "Todos os preços" },
  { value: "0-50", label: "Até R$ 50" },
  { value: "50-100", label: "R$ 50 - R$ 100" },
  { value: "100-200", label: "R$ 100 - R$ 200" },
  { value: "200+", label: "Acima de R$ 200" }
];
