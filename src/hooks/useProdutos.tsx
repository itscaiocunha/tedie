import { useState, useEffect } from "react";
import { Produto } from '../types/produto';

const useProduto = (productId: number) => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://tedie-api.vercel.app/api/produtos?id=${productId}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar produto");
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        // Garantindo que preco seja um número antes de armazenar
        const produtoFormatado: Produto = {
          ...data,
          preco: Number(data.preco) || 0, // Se for inválido, define como 0
        };

        setProduto(produtoFormatado);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { produto, loading, error };
};

export default useProduto;
