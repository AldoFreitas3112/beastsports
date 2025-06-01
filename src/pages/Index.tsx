
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RotatingBanner from "@/components/RotatingBanner";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import Login from "@/components/Login";
import Account from "@/components/Account";
import ProductDetails from "@/components/ProductDetails";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === product.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const renderContent = () => {
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
        return (
          <>
            <Hero setCurrentView={setCurrentView} />
            <RotatingBanner />
            <ProductGrid 
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              featured={true}
              setCurrentView={setCurrentView}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        setCurrentView={setCurrentView}
        cartItemsCount={cartItems.length}
        user={user}
        setUser={setUser}
      />
      {renderContent()}
      <Footer />
    </div>
  );
};

export default Index;
