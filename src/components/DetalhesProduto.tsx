import React, { useState } from "react";
import useProduto from "../hooks/useProdutos";
import { Minus, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "../context/CarrinhoContext";

interface Props {
  productId: number;
}

const DetalhesProduto: React.FC<Props> = ({ productId }) => {
  const { produto, loading, error } = useProduto(productId);
  const [quantity, setQuantity] = useState(1);
  const { adicionarAoCarrinho } = useCarrinho();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!produto) return <p>Produto não encontrado</p>;

  const handleQuantityChange = (action: "increase" | "decrease") => {
    setQuantity((prev) => {
      if (action === "increase" && prev < produto.estoque) return prev + 1;
      if (action === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    adicionarAoCarrinho({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: quantity,
      imagem: produto.imagem,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagem do Produto */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover bg-[#FFF8F3]"
            />
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">{produto.nome}</h1>
          <span className="text-2xl font-semibold">R$ {produto.preco.toFixed(2)}</span>

          {/* Seção de Avaliações */}
          <div className="flex items-center gap-2">
            {produto.avaliacoes > 0 ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(produto.avaliacao)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600">{produto.avaliacoes} avaliações</span>
              </>
            ) : (
              <span className="text-sm text-gray-600">Sem avaliações</span>
            )}
          </div>

          {/* Descrição do Produto */}
          <p className="text-gray-600">{produto.descricao}</p>

          {/* Seção de Quantidade e Adição ao Carrinho */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity >= produto.estoque}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Botão de Adicionar ao Carrinho */}
            <Button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              onClick={handleAddToCart}
              disabled={produto.estoque === 0}
            >
              {produto.estoque > 0 ? "ADICIONAR AO CARRINHO" : "ESGOTADO"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProduto;
