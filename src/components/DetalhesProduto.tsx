import React, { useState } from "react";
import useProduto from "../hooks/useProdutos";
import { Minus, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  productId: number;
}

const DetalhesProduto: React.FC<Props> = ({ productId }) => {
  const { produto, loading, error } = useProduto(productId);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!produto) return <p>Produto não encontrado</p>;

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < produto.estoque) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagens do Produto */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold mb-4">{produto.nome}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(produto.avaliacao)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {produto.avaliacoes} avaliações
              </span>
            </div>
            <p className="text-gray-600">{produto.descricao}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">
                R$ {produto.preco.toFixed(2)}
              </span>
              <span className="text-sm text-gray-600">
                {produto.estoque} unidades disponíveis
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 hover:bg-gray-50"
                  disabled={quantity >= produto.estoque}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => console.log("Adicionar ao carrinho")}
              >
                ADICIONAR AO CARRINHO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProduto;
