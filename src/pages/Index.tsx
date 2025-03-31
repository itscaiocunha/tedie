import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSearch from "../hooks/useSearch";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/Search/SearchBar"; 
import SearchResults from "../components/Search/SearchResults";
import ProductGrid from "../components/Product/ProductGrid";
import CreatorGrid from "../components/Creator/CreatorGrid";
import VideoModal from "../components/ui/Modal";
import Loading from "../components/ui/Loading";

const Index = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    loading,
    hasSearched,
    handleSearch,
    handleCardClick,
  } = useSearch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Dados de sugestões otimizados
  const suggestions = [
    {
      id: 'sug-1',
      src: "/image/card01.webp", // Convertido para webp
      text: "Produtos saudáveis para atividades físicas",
      query: "produtos saudáveis",
      category: "Saúde"
    },
    {
      id: 'sug-2',
      src: "/image/card02.webp",
      text: "Marmitas veganas para dias úteis",
      query: "comidas veganas",
      category: "Alimentação"
    },
    {
      id: 'sug-3',
      src: "/image/card03.webp",
      text: "Acessórios para cachorros Shih Tzu",
      query: "acessórios para cachorro",
      category: "Pets"
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <Header 
        user={user} 
        onLogout={logout} 
        isAuthenticated={isAuthenticated} 
        sticky={isScrolled}
      />

      {/* Hero Section */}
      <section className="pt-32 md:pt-60 pb-16 md:pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="mb-8 md:mb-12">
            <h1 className="text-xl md:text-2xl text-red-500 font-medium">
              A LOJA DOS SEUS PRODUTOS FAVORITOS
            </h1>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
          />

          <button
            className="text-red-500 text-sm mt-4 underline hover:text-red-600 transition-colors"
            onClick={toggleModal}
            aria-label="Aprenda como usar a busca"
          >
            Não sei como usar
          </button>
        </div>

        <VideoModal isOpen={isModalOpen} onClose={toggleModal} />
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="py-12 md:py-16 px-4 bg-[#FBF8F4]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 md:mb-8">
              Resultados para "{searchQuery}"
            </h2>
            {loading ? (
              <Loading />
            ) : (
              <SearchResults 
                results={searchResults} 
                query={searchQuery} 
                onEmptyResults={() => (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      Nenhum resultado encontrado para sua busca.
                    </p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-red-500 hover:underline"
                    >
                      Limpar busca
                    </button>
                  </div>
                )}
              />
            )}
          </div>
        </section>
      )}

      {/* Product Suggestions */}
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold pb-6 md:pb-8">
            Sugestões do Tedie
          </h2>
          <ProductGrid 
            products={suggestions} 
            onCardClick={handleCardClick}
            cols={3}
          />
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-[#FFC601] to-[#FBF8F4] to-50%">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold pb-6 md:pb-8">
            Tedie Creators
          </h2>
          <CreatorGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;