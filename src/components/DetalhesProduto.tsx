import React, { useState } from "react";
import useProduto from "../hooks/useProdutos";
import { Minus, Plus, Star, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

interface Props {
  productId: number;
}

const DetalhesProduto: React.FC<Props> = ({ productId }) => {
  const { produto, loading, error } = useProduto(productId);
  const [quantity, setQuantity] = useState(1);
  const { adicionarAoCarrinho } = useCarrinho();
  const navigate = useNavigate();

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
      <div className="animate-pulse space-y-6 w-full max-w-2xl">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#FBF8F4] flex flex-col">
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="rounded-lg shadow-sm max-w-md w-full text-center space-y-6">
            <div>
              <img 
                src="/image/notfound.png" 
                alt="Teddie not found" 
                className="mx-auto w-64 h-auto mb-6 object-contain"
              />
              <h2 className="text-xl font-medium text-gray-800">
                Produto não encontrado
              </h2>
              <p className="text-gray-600 mt-2">
                O ID do produto não foi fornecido ou é inválido.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mx-auto px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Voltar para a loja
            </button>
          </div>
        </main>
      </div>
  );

  if (!produto) return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <p>Produto não encontrado</p>
      <Button 
        variant="outline" 
        className="mt-4" 
        onClick={() => navigate('/')}
      >
        Ver outros produtos
      </Button>
    </div>
  );

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
      imagem: produto.imagem,
      quantidade: quantity,
    });
  };

  return (
    <div className="max-w-7xl mt-28 mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Imagem do Produto */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-contain p-4"
            />
          </div>
          
          {produto.estoque > 0 && (
            <p className="text-sm text-green-600">
              {produto.estoque} unidades disponíveis
            </p>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{produto.nome}</h1>
            <span className="text-2xl font-semibold text-gray-900 block mt-2">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Seção de Avaliações */}
          <div className="flex items-center gap-2">
            {produto.avaliacoes > 0 ? (
              <>
                <div className="flex">
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
                </div>
                <span className="text-sm text-gray-600 ml-1">
                  ({produto.avaliacoes} avaliações)
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-600">Sem avaliações</span>
            )}
          </div>

          {/* Descrição do Produto */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{produto.descricao}</p>
          </div>

          {/* Seção de Quantidade e Adição ao Carrinho */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center border-x">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={quantity >= produto.estoque}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg"
                onClick={handleAddToCart}
                disabled={produto.estoque === 0}
              >
                {produto.estoque === 0 ? 'ESGOTADO' : 'ADICIONAR AO CARRINHO'}
              </Button>
            </div>
            
            {produto.estoque === 0 && (
              <p className="mt-2 text-sm text-red-500">Este produto está temporariamente esgotado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProduto;