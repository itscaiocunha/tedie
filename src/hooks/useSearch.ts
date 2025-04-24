import { useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { adicionarAoCarrinho } = useCarrinho();

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://apijuliatedie.azurewebsites.net/Julia/send-message?message=${query}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "542cd9a9-b650-47f5-a0c6-f8d23e03aa4d",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro na busca");

      // Ajuste apenas na extração dos dados (mantendo o endpoint original):
      if (data.produtos && Array.isArray(data.produtos)) {
        setSearchResults(data.produtos);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setSearchResults([]);
    } finally {
      // Usar setTimeout para garantir que o loading seja visível por um tempo
      setTimeout(() => {
        setLoading(false);
        setHasSearched(true);
      }, 100); // 100ms de delay (ajustar conforme necessário)
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery);
    }
  };

  const handleCardClick = (query: string) => {
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    loading,
    hasSearched,
    handleSearch,
    handleCardClick,
    fetchSearchResults,
  };
};

export default useSearch;
