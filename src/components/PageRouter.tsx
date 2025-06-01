
import ProductDetails from "@/components/ProductDetails";
import Checkout from "@/components/Checkout";
import ProductGrid from "@/components/ProductGrid";
import Cart from "@/components/Cart";
import Login from "@/components/Login";
import Account from "@/components/Account";
import { products } from "@/data/products";

interface PageRouterProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartItems: any[];
  favorites: any[];
  user: any;
  setUser: (user: any) => void;
  addToCart: (product: any) => void;
  toggleFavorite: (product: any) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const PageRouter = ({
  currentView,
  setCurrentView,
  cartItems,
  favorites,
  user,
  setUser,
  addToCart,
  toggleFavorite,
  updateQuantity,
  removeFromCart
}: PageRouterProps) => {
  // Check if currentView starts with "product-"
  if (currentView.startsWith("product-")) {
    const productId = currentView.replace("product-", "");
    return (
      <ProductDetails
        productId={productId}
        setCurrentView={setCurrentView}
        addToCart={addToCart}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    );
  }

  // Check if currentView starts with "checkout-product-"
  if (currentView.startsWith("checkout-product-")) {
    const parts = currentView.replace("checkout-product-", "").split("-");
    const productId = parts[0];
    const quantity = parseInt(parts[1]) || 1;
    const selectedSize = parts[2] || "M";
    
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      return (
        <Checkout
          setCurrentView={setCurrentView}
          productData={{ ...product, quantity, selectedSize }}
        />
      );
    }
  }

  // Check if currentView is "checkout-cart"
  if (currentView === "checkout-cart") {
    return (
      <Checkout
        items={cartItems}
        setCurrentView={setCurrentView}
      />
    );
  }

  switch (currentView) {
    case "products":
      return (
        <ProductGrid 
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          setCurrentView={setCurrentView}
        />
      );
    case "cart":
      return (
        <Cart
          items={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          setCurrentView={setCurrentView}
        />
      );
    case "login":
      return <Login setUser={setUser} setCurrentView={setCurrentView} />;
    case "account":
      return (
        <Account 
          user={user} 
          setUser={setUser} 
          favorites={favorites}
          setCurrentView={setCurrentView}
        />
      );
    case "about":
      return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-green-100">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Sobre a Beast Sports</h1>
            <div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-6">
              <p>
                A Beast Sports nasceu da paixão pelo futebol e pelo esporte. Somos uma loja dedicada 
                a oferecer os melhores produtos esportivos para atletas de todos os níveis.
              </p>
              <p>
                Nossa missão é inspirar e equipar cada pessoa a alcançar seu melhor desempenho, 
                fornecendo produtos de alta qualidade que combinam tecnologia, conforto e estilo.
              </p>
              <p>
                Desde uniformes profissionais até equipamentos de treino, cada produto é 
                cuidadosamente selecionado para atender às necessidades dos verdadeiros apaixonados por esporte.
              </p>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentView("home")}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      );
    case "contact":
      return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-green-100">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Contato</h1>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Entre em Contato</h3>
                    <div className="space-y-3">
                      <p><strong>Email:</strong> contato@beastsports.com</p>
                      <p><strong>Telefone:</strong> (11) 99999-9999</p>
                      <p><strong>WhatsApp:</strong> (11) 88888-8888</p>
                      <p><strong>Endereço:</strong> Rua do Futebol, 123 - São Paulo, SP</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Horário de Atendimento</h3>
                    <div className="space-y-2">
                      <p><strong>Segunda a Sexta:</strong> 8h às 18h</p>
                      <p><strong>Sábado:</strong> 9h às 16h</p>
                      <p><strong>Domingo:</strong> Fechado</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => setCurrentView("home")}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Voltar ao Início
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default PageRouter;
