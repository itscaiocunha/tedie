import { useState } from "react";
import { Search, ShoppingCart, User, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VideoModal from "./VideoModal";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch("https://tedie-api.vercel.app/api/julia", {
        method: "POST", // Alterando para POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: query }), // Enviando o parâmetro no corpo da requisição
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        console.error("Resposta inesperada da API:", data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para lidar com a pesquisa
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      fetchSearchResults(searchQuery);
    }
  };

  // Função para abrir/fechar o modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#FBF8F4] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/products" className="text-red-500 hover:text-yellow-500 transition-colors">PRODUTOS</a>
            <a href="/creator" className="text-red-500 hover:text-yellow-500 transition-colors">CREATOR</a>
            <a href="/about" className="text-red-500 hover:text-yellow-500 transition-colors">SOBRE NÓS</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:text-yellow-500 transition-colors"
                onClick={() => navigate("/checkout")}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            <button 
              className="p-2 hover:text-yellow-500 transition-colors"
              onClick={() => navigate("/login")}
            >
              <User className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-60 pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* <img src="/logotype_tedie.svg" alt="Logo" className="h-26 mx-auto" /> */}
          
        <div className="mb-12  px-4 ml-[10%]">
          <h3 className="text-2xl text-red-500 font-regular">A LOJA DOS SEUS PRODUTOS FAVORITOS</h3>

        </div>
          <form onSubmit={handleSearch} className="text-center py-10">
            <Input
              type="text"
              placeholder="Digite qual seu desejo para hoje?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-lg pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <Button type="submit" className="bg-[#FFC601] hover:bg-[#FFC601] text-white mt-2">
              <Search /> Consultar
            </Button>
          </form>
          <button className="text-red-500 text-sm mt-6 block underline block mx-auto" onClick={toggleModal}>Não sei como usar</button>
        </div>

         {/* Modal de Vídeo */}
         <VideoModal isOpen={isModalOpen} onClose={toggleModal} />
      </section>

      {hasSearched && (
        <section className="py-16 px-4 bg-[#FBF8F4]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">Resultados para "{searchQuery}"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg">{product.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg">{product.price}</span>
                          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                            COMPRAR
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhum resultado encontrado.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl py-8 font-semibold">Sugestões do Tedie</h2>

          {/* Definindo a lista de imagens e seus respectivos textos */}
          {(() => {
            const products = [
              { src: "/image/card01.png", text: "EU AMO FAZER ATIVIDADES FÍSICAS DURANTE A SEMANA, PRECISO DE PRODUTOS SAUDÁVEIS PARA MANTER A FORMA" },
              { src: "/image/card02.png", text: "EU SIGO UMA ALIMENTAÇÃO VEGANA E PRECISO MONTAR MARMITAS DE TODOS OS MEUS DIAS ÚTEIS" },
              { src: "/image/card03.png", text: "EU TENHO UM CACHORRO SHIH TZU FILHOTE E QUE AMA BRINCAR COM ACESSÓRIOS PET" },
            ];

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <div 
                    key={index} 
                    className="relative overflow-hidden group transition-shadow cursor-pointer rounded-lg"
                  >
                    <Card>
                      <div className="relative aspect-square rounded-lg">
                        <img 
                          src={product.src} 
                          alt={`Produto ${index + 1}`} 
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300 rounded-lg"
                        />
                      </div>

                      <button className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                        <Flame className="h-4 w-4 text-red-500" />
                        <span className="text-xs font-medium text-gray-700">Mais Pesquisado</span>
                      </button>
                      
                      {/* Botão de busca com ícone e texto */}
                      <button className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                        <Search className="h-4 w-4" />
                        <span className="text-xs font-medium text-gray-700">Pesquisar</span>
                      </button>

                      <div className="absolute top-80 right-4 left-4 flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow m-2">
                        <p className="text-xs text-gray-700">{product.text}</p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-16 px-4 bg-[linear-gradient(180deg,#FFC601_50%,#FBF8F4_50%)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl py-8 font-semibold">Tedie creators</h2>

          {(() => {
            const creators = [
              { src: "https://w7startup.com.br/video/creator1.mp4" },
              { src: "https://w7startup.com.br/video/creator2.mp4" },
              { src: "https://w7startup.com.br/video/creator3.mp4" },
            ];

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {creators.map((creator, index) => (
                  <div key={index} className="space-y-4">
                    <div className="relative aspect-[9/16] bg-gray-100 rounded-[20px] overflow-hidden w-full border-4 border-white">
                      <video 
                        src={creator.src} 
                        className="object-cover w-full h-full" 
                        controls
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button className="bg-[#FFC600] hover:bg-[#FFC600] text-white">
                        EU QUERO
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4 border-yellow-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <img src="/logo_tedie.svg" alt="Logo" className="h-12" />
          <div className="flex space-x-8 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-yellow-500 transition-colors">PRIVACIDADE</a>
            <a href="/terms" className="hover:text-yellow-500 transition-colors">TERMOS E CONDIÇÕES</a>
            <a href="/creators" className="hover:text-yellow-500 transition-colors">PROGRAMA CREATORS</a>

            <p className="px-28">© {new Date().getFullYear()} Tedie. Simples assim!</p>
          </div>
        </div>
      </footer>
      {/* Cart{showCart && <Cart onClose={() => setShowCart(false)} />} */}
    </div>
  );
};

export default Index;
