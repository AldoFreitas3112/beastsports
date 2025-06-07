
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";

interface Product {
  fullDescription: string;
  specifications: {
    material: string;
    peso: string;
    origem: string;
    cuidados: string;
  };
  staticReviews?: any[];
}

interface ProductTabsProps {
  product: Product;
  reviews: any[];
  loading: boolean;
  submitting: boolean;
  submitReview: (rating: number, comment: string) => Promise<boolean>;
  setCurrentView: (view: string) => void;
}

const ProductTabs = ({
  product,
  reviews,
  loading,
  submitting,
  submitReview,
  setCurrentView
}: ProductTabsProps) => {
  const { isAuthenticated } = useAuth();

  return (
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
          <div className="space-y-6">
            <ReviewsList 
              reviews={reviews}
              staticReviews={product.staticReviews || []}
              loading={loading}
            />
            
            {isAuthenticated ? (
              <ReviewForm 
                onSubmit={submitReview}
                submitting={submitting}
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">
                  Faça login para avaliar este produto
                </p>
                <button
                  onClick={() => setCurrentView("login")}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Fazer Login
                </button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
