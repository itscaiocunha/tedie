import { Card } from "../ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import type { SwiperOptions } from 'swiper/types';

interface ProductGridProps {
  products: Array<{
    src: string;
    text: string;
    query: string;
    refrigerado?: boolean;
  }>;
  onCardClick: (query: string) => void;
}

const ProductGrid = ({ products, onCardClick }: ProductGridProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configurações do carrossel com tipagem correta
  const swiperParams: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 16,
    centeredSlides: isMobile,
    navigation: !isMobile,
    modules: [Navigation, Autoplay],
    breakpoints: {
      768: {
        centeredSlides: false,
        spaceBetween: 16
      }
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <Swiper {...swiperParams} className="product-carousel">
        {products.map((product, index) => (
          <SwiperSlide key={index} className="!w-[250px] md:!w-[280px]">
            <div 
              className="relative overflow-hidden group transition-shadow cursor-pointer rounded-lg h-full"
              onClick={() => onCardClick(product.query)}
              role="button"
              tabIndex={0}
              aria-label={`Buscar por ${product.query}`}
              onKeyDown={(e) => e.key === "Enter" && onCardClick(product.query)}
            >
              <Card className="border-none shadow-none h-full">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={product.src}
                    alt={`Sugestão ${index + 1}`}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.refrigerado && (
                    <span className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-sm">
                      🧊
                    </span>
                  )}
                </div>
                <div className="absolute top-4 left-4 bg-white rounded-md shadow-md px-2 py-1">
                  <p className="text-[12px] font-light">MAIS PESQUISADO 🔥</p> 
                </div>
                <div className="absolute bottom-4 left-4 mr-5 bg-white px-3 py-1 rounded-md shadow-md">
                  <p className="text-[12px] font-light">🔎 {product.text}</p> 
                </div>
              </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGrid;