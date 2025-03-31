import { useCarrinho } from "../../context/CarrinhoContext";
import CreatorCard from "./CreatorCard";

const CreatorGrid = () => {
  const { adicionarAoCarrinho } = useCarrinho();

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
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
          quantidade: 1,
        });
      } catch (error) {
        console.error(`Erro ao adicionar o produto ${id} ao carrinho:`, error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {creators.map((creator, index) => (
        <CreatorCard
          key={index}
          videoSrc={creator.src}
          items={creator.items}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default CreatorGrid;