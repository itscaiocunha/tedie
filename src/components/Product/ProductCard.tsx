import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: {
    id: string;
    nome: string;
    preco: number;
    imagem: string;
    refrigerado?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.imagem}
          alt={product.nome}
          className="object-cover w-10 h-10 transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.refrigerado && (
          <span className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-sm">
            🧊
          </span>
        )}
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">{product.nome}</h3>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">R$ {product.preco.toFixed(2)}</span>
            <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600">
              COMPRAR
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;