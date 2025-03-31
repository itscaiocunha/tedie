import { useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { adicionarAoCarrinho } = useCarrinho();

  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://tedie-api.vercel.app/api/julia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro na busca");
      }

      if (data.produtos && Array.isArray(data.produtos)) {
        setSearchResults(data.produtos);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
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
  };
};

export default useSearch;