import { useCarrinho } from "../../context/CarrinhoContext";
import CreatorCard from "./CreatorCard";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Importe apenas os estilos necessários
import "swiper/css";
import "swiper/css/navigation";

const CreatorGrid = () => {
  const { adicionarAoCarrinho } = useCarrinho();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verifica no carregamento
    handleResize();
    
    // Adiciona listener para redimensionamento
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const creators = [
    { 
      src: "https://w7startup.com.br/video/creator1.mp4", 
      items: 2 
    },
    { 
      src: "https://w7startup.com.br/video/creator2.mp4", 
      items: [11644, 219] 
    },
    { 
      src: "https://w7startup.com.br/video/creator3.mp4", 
      items: 12520 
    },
  ];

  const handleAddToCart = async (items: number | number[]) => {
    const ids = Array.isArray(items) ? items : [items];
    
    for (const id of ids) {
      try {
        const response = await fetch(`https://tedie-api.vercel.app/api/produtos?id=${id}`);
        if (!response.ok) throw new Error("Erro ao buscar produto");

        const produto = await response.json();
        adicionarAoCarrinho({
          produto_id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
          quantidade: 1,
          refrigerado: produto.refrigerado
        });
      } catch (error) {
        console.error(`Erro ao adicionar o produto ${id} ao carrinho:`, error);
      }
    }
  };

  // Configurações do carrossel sem paginação
  const swiperParams = {
    slidesPerView: 1, // 1 slide no mobile
    spaceBetween: isMobile ? 0 : 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: !isMobile, // Mostra navegação apenas no desktop
    modules: [Navigation, Autoplay],
    breakpoints: {
      768: { // Desktop
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      1024: { // Telas grandes
        slidesPerView: 3,
        centeredSlides: false,
      }
    }
  };

  return (
    <div className={`w-full ${isMobile ? 'px-0' : 'px-4'} py-8`}>
      <Swiper {...swiperParams} className="mySwiper">
        {creators.map((creator, index) => (
          <SwiperSlide key={index}>
            <div className={isMobile ? "w-full" : "px-2"}>
              <CreatorCard
                videoSrc={creator.src}
                items={creator.items}
                onAddToCart={handleAddToCart}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CreatorGrid;