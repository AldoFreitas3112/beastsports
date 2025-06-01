
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const RotatingBanner = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  const bannerImages = [
    {
      src: "/lovable-uploads/1a8927ea-8cfd-4058-9f48-937e72b4cdff.png",
      alt: "Beast Sports - Camisa Preta"
    },
    {
      src: "/lovable-uploads/d6d73ab6-1736-416a-85e8-4b84c58aa48b.png", 
      alt: "Beast Sports - Camisa Branca"
    },
    {
      src: "/lovable-uploads/ee8d7e20-06bb-44ca-a298-1f2b7918d583.png",
      alt: "Beast Sports - Jogador com Bola"
    },
    {
      src: "/lovable-uploads/49103b58-c98f-48cc-9d1f-899afe8c921a.png",
      alt: "Beast Sports - Uniforme Completo"
    }
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Vista-se como um Campeão
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça nossa linha exclusiva Beast Sports e desperte o atleta que há em você
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Carousel 
            className="w-full"
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {bannerImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        Beast Sports
                      </h3>
                      <p className="text-lg opacity-90">
                        Qualidade e Performance em Cada Produto
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-green-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RotatingBanner;
