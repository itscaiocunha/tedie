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
      text: "EU SOU JOGADOR DE FUTEBOL, PRECISO RECUPERAR MINHAS ENERGIAS APÓS O JOGO",
      query:
        "EU SOU JOGADOR DE FUTEBOL, PRECISO RECUPERAR MINHAS ENERGIAS APÓS O JOGO",
    },
    {
      src: "/image/card02.png",
      text: "EU AMO ASSISTIR JOGO DE FUTEBOL, E FICA MELHOR COM PETICOS E BEBIDAS",
      query:
        "EU AMO ASSISTIR JOGO DE FUTEBOL, E FICA MELHOR COM ALGUNS PETICOS E BEBIDAS",
    },
    {
      src: "/image/card03.png",
      text: "PRECISO DE PRODUTOS DE HIGIENE PARA UM PÓS JOGO DE FUTEBOL",
      query: "PRECISO DE PRODUTOS DE HIGIENE PARA UM PÓS JOGO DE FUTEBOL",
    },
    {
      src: "/image/card04.png",
      text: "HOJE VAI TER UM ALMOÇO EM CASA PARA TODA MINHA FAMÍLIA",
      query: "HOJE VAI TER UM ALMOÇO EM CASA PARA TODA MINHA FAMÍLIA",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 mt-12">
        {/* Container principal com posicionamento relativo */}
        <div className="max-w-3xl mx-auto">
          {/* Imagem do urso (absoluta para permitir sobreposição) */}
          <div className="flex justify-center">
            <img
              src="/logos/Urso_Tedie.png"
              alt="Logo Urso Tedie"
              className="w-[300px] md:w-[400px] object-contain relative z-10 -mb-[120px]"
            />
          </div>

          {/* Container da busca (sobrepondo o urso) */}
          <div className="relative z-20 rounded-lg p-6 pt-20">
            <div className="text-center space-y-6 animate-slide">
              <SearchBar
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onSearch={handleSearch}
              />

              <button
                className="text-red-500 text-sm hover:text-red-600 transition-colors underline mx-auto block"
                onClick={toggleModal}
                aria-label="Aprenda como usar a busca"
              >
                Não sei como usar
              </button>
            </div>
          </div>
        </div>

        <VideoModal isOpen={isModalOpen} onClose={toggleModal} />
      </section>

      {/* Modifique o render para não depender de hasSearched */}
      <section
        className="py-16 px-4 bg-[#FBF8F4] transition-all duration-300"
        style={{ marginTop: "-50px" }}
      >
        {loading ? (
          <div className="animate-slide">
            <Loading />
          </div>
        ) : searchResults.length > 0 || hasSearched ? (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Resultados para "{searchQuery}"
            </h2>
            <SearchResults
              results={searchResults}
              query={searchQuery}
              onEmptyResults={() => (
                <p className="text-center text-gray-500">
                  Nenhum resultado encontrado. Tente ajustar sua busca.
                </p>
              )}
            />
          </div>
        ) : null}
      </section>

      {/* Product Suggestions */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl py-8 font-semibold">Sugestões do Tedie</h2>
          <ProductGrid products={suggestions} onCardClick={handleCardClick} />
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
