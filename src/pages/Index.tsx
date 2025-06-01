
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import PageRouter from "@/components/PageRouter";

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
    if (currentView === "home") {
      return (
        <HomePage
          setCurrentView={setCurrentView}
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      );
    }

    return (
      <PageRouter
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartItems={cartItems}
        favorites={favorites}
        user={user}
        setUser={setUser}
        addToCart={addToCart}
        toggleFavorite={toggleFavorite}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    );
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
