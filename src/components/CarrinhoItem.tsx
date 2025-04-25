import { Trash } from "lucide-react";
import { ProductItem } from "../types/checkoutTypes";
import { Input } from "@/components/ui/input";

interface CarrinhoItemProps {
  item: ProductItem;
  onRemove: (produto_id: number, nome: string) => void;
  formatarMoeda: (valor: number) => string;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
}

export const CarrinhoItem = ({ 
  item, 
  onRemove, 
  formatarMoeda,
  onUpdateQuantity
}: CarrinhoItemProps) => {
  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value) || 1;
    if (newQuantity > 0 && newQuantity <= 100) {
      onUpdateQuantity(item.produto_id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4" role="listitem">
      <img 
        src={item.imagem} 
        alt={item.nome} 
        className="w-20 h-20 object-cover rounded" 
        loading="lazy"
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate" aria-label={`Produto: ${item.nome}`}>
          {item.nome}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="number"
            min="1"
            max="100"
            value={item.quantidade}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-16 h-8 text-center"
            aria-label={`Quantidade de ${item.nome}`}
          />
          <span className="text-gray-600">
            × {formatarMoeda(item.preco)}
          </span>
        </div>
      </div>
      <span className="font-semibold whitespace-nowrap" aria-label={`Subtotal: ${formatarMoeda(item.quantidade * item.preco)}`}>
        {formatarMoeda(item.quantidade * item.preco)}
      </span>
      <button 
        onClick={() => onRemove(item.produto_id, item.nome)} 
        className="text-red-500 hover:text-red-700 ml-2"
        aria-label={`Remover ${item.nome} do carrinho`}
      >
        <Trash size={20} aria-hidden="true" />
      </button>
    </div>
  );
};