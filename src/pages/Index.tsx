import { useState } from "react";
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

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Dados de sugestões
  const suggestions = [
    {
      src: "/image/card01.png",
      text: "EU AMO FAZER ATIVIDADES FÍSICAS DURANTE A SEMANA, PRECISO DE PRODUTOS SAUDÁVEIS PARA MANTER A FORMA",
      query: "produtos saudáveis",
    },
    {
      src: "/image/card02.png",
      text: "EU SIGO UMA ALIMENTAÇÃO VEGANA E PRECISO MONTAR MARMITAS DE TODOS OS MEUS DIAS ÚTEIS",
      query: "comidas veganas",
    },
    {
      src: "/image/card03.png",
      text: "EU TENHO UM CACHORRO SHIH TZU FILHOTE E QUE AMA BRINCAR COM ACESSÓRIOS PET",
      query: "acessórios para cachorro",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <section className="pt-60 pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide">
          <div className="mb-12 px-4 ml-[10%]">
            <h1 className="text-2xl text-red-500 font-regular">
              A LOJA DOS SEUS PRODUTOS FAVORITOS
            </h1>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
          />

          <button
            className="text-red-500 text-sm mt-6 block underline block mx-auto"
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
        <section className="py-16 px-4 bg-[#FBF8F4]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Resultados para "{searchQuery}"
            </h2>
            {loading ? (
              <div className="animate-slide"> <Loading /> </div>
            ) : (
              <SearchResults 
                results={searchResults} 
                query={searchQuery} 
                onEmptyResults={() => (
                  <p className="text-center text-gray-500">
                    Nenhum resultado encontrado. Tente ajustar sua busca.
                  </p>
                )}
              />
            )}
          </div>
        </section>
      )}

      {/* Product Suggestions */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl py-8 font-semibold">Sugestões do Tedie</h2>
          <ProductGrid 
            products={suggestions} 
            onCardClick={handleCardClick} 
          />
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-16 px-4 bg-[linear-gradient(180deg,#FFC601_50%,#FBF8F4_50%)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl py-8 font-semibold">Tedie creators</h2>
          <CreatorGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;