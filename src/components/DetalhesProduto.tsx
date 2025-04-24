import React, { useState, useEffect } from "react";
import useProduto from "../hooks/useProdutos";
import { Minus, Plus, Star, ChevronLeft, ChevronRight, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AnalyticsEvent, trackEvent } from "../lib/analytics";

interface Props {
  productId: number;
}

const DetalhesProduto: React.FC<Props> = ({ productId }) => {
  const { produto, loading, error } = useProduto(productId);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { adicionarAoCarrinho } = useCarrinho();
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuantity = localStorage.getItem(`product_${productId}_quantity`);
    if (savedQuantity) {
      setQuantity(Number(savedQuantity));
    }
  }, [productId]);

  useEffect(() => {
    if (!produto) return;
    localStorage.setItem(`product_${productId}_quantity`, quantity.toString());
  }, [quantity, productId, produto]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (!produto) return;
    
    setQuantity(prev => {
      if (type === "increase") {
        if (prev >= produto.estoque) {
          toast.error(`Quantidade máxima disponível: ${produto.estoque}`);
          return prev;
        }
        return prev + 1;
      } else {
        return prev > 1 ? prev - 1 : prev;
      }
    });
  };

  const handleAddToCart = () => {
    if (!produto) return;
    
    adicionarAoCarrinho({
      produto_id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: quantity,
      refrigerado: produto.refrigerado > 0 // Modificado para boolean
    });

    trackEvent(AnalyticsEvent.ADD_TO_CART, {
      productId: produto.id,
      quantity,
      price: produto.preco,
      refrigerated: produto.refrigerado > 0 // Modificado para boolean
    });

    toast.success(`${quantity}x ${produto.nome} adicionado ao carrinho!`);
  };

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (!produto?.imagens) return;
    
    setCurrentImageIndex(prev => {
      if (direction === "prev") {
        return prev === 0 ? produto.imagens.length - 1 : prev - 1;
      } else {
        return prev === produto.imagens.length - 1 ? 0 : prev + 1;
      }
    });
  };

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
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <p className="text-red-500">Erro ao carregar produto</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => navigate('/')}
      >
        Voltar para loja
      </Button>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <img
              src={produto.imagens?.[currentImageIndex] || produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />
            
            {produto.refrigerado > 0 && (
              <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-blue-500" />
                <span className="sr-only">Produto refrigerado</span>
              </div>
            )}
            
            {produto.imagens && produto.imagens.length > 1 && (
              <>
                <button
                  onClick={() => handleImageNavigation("prev")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleImageNavigation("next")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {produto.imagens && produto.imagens.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {produto.imagens.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-blue-500 scale-105' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  aria-label={`Visualizar imagem ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${produto.nome} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {produto.nome}
              </h1>
              
              {produto.refrigerado > 0 && (
                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full">
                  <Snowflake className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Refrigerado</span>
                </div>
              )}
            </div>
            
            <span className="text-2xl font-semibold text-gray-900 block">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
            
            <div className="flex items-center gap-3">
              {produto.refrigerado > 0 && (
                <span className="md:hidden flex items-center gap-1 text-sm text-blue-600">
                  <Snowflake className="w-4 h-4" /> Refrigerado
                </span>
              )}
            </div>
          </div>

          {/* Ratings */}
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

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-justify">
              {produto.descricao}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={quantity <= 1}
                  aria-label="Reduzir quantidade"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center border-x">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={quantity >= produto.estoque}
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg transition-colors"
                onClick={handleAddToCart}
                disabled={produto.estoque === 0}
                aria-label="Adicionar ao carrinho"
              >
                {produto.estoque === 0 
                  ? 'ESGOTADO' 
                  : `ADICIONAR AO CARRINHO`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProduto;