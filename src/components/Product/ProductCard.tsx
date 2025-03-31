import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    nome: string;
    preco: number;
    imagem: string;
    desconto?: number;
    estoque?: number;
    categoria?: string;
  };
  onAddToCart?: (productId: string) => void;
  onFavorite?: (productId: string) => void;
}

const ProductCard = ({ product, onAddToCart, onFavorite }: ProductCardProps) => {
  const priceWithDiscount = product.desconto 
    ? product.preco * (1 - product.desconto / 100)
    : product.preco;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative flex-grow">
        {/* Imagem do produto com efeitos hover */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.imagem}
            alt={product.nome}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 space-x-2">
            {product.desconto && (
              <Badge variant="destructive" className="px-2 py-1">
                -{product.desconto}%
              </Badge>
            )}
            {product.estoque === 0 && (
              <Badge variant="outline" className="bg-white/90">
                ESGOTADO
              </Badge>
            )}
          </div>
          
          {/* Botão de favorito */}
          <button 
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(product.id);
            }}
            aria-label="Favoritar produto"
          >
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <CardContent className="p-4 space-y-2">
          {product.categoria && (
            <span className="text-sm text-gray-500">{product.categoria}</span>
          )}
          <h3 className="font-semibold text-lg line-clamp-2">{product.nome}</h3>
          
          {/* Preço */}
          <div className="flex items-center gap-2">
            {product.desconto ? (
              <>
                <span className="font-bold text-lg text-primary">
                  {priceWithDiscount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-primary">
                {product.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 border-t">
        <Button 
          variant="default" 
          className="w-full bg-yellow-500 hover:bg-yellow-600 gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product.id);
          }}
          disabled={product.estoque === 0}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.estoque === 0 ? 'ESGOTADO' : 'COMPRAR'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;