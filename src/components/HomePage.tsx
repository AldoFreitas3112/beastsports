
import Hero from "@/components/Hero";
import RotatingBanner from "@/components/RotatingBanner";
import ProductGrid from "@/components/ProductGrid";

interface HomePageProps {
  setCurrentView: (view: string) => void;
  addToCart: (product: any) => void;
  toggleFavorite: (product: any) => void;
  favorites: any[];
}

const HomePage = ({ setCurrentView, addToCart, toggleFavorite, favorites }: HomePageProps) => {
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
};

export default HomePage;
