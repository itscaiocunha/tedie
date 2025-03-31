import { Card } from "../ui/card";
import { useRouter } from "next/router"; // ou useNavigate do react-router-dom

interface Product {
  id: string;
  src: string;
  text: string;
  query: string;
  category?: string;
  isNew?: boolean;
}

interface ProductGridProps {
  products: Product[];
  onCardClick?: (query: string) => void;
  cols?: 1 | 2 | 3 | 4;
  withTextOverlay?: boolean;
}

const ProductGrid = ({ 
  products, 
  onCardClick, 
  cols = 3,
  withTextOverlay = true 
}: ProductGridProps) => {
  const router = useRouter();
  
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  const handleClick = (product: Product) => {
    if (onCardClick) {
      onCardClick(product.query);
    } else {
      // Navegação padrão se nenhum handler for fornecido
      router.push(`/search?q=${encodeURIComponent(product.query)}`);
    }
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-6`}>
      {products.map((product) => (
        <div
          key={product.id}
          className="relative group transition-all hover:-translate-y-1 cursor-pointer"
          onClick={() => handleClick(product)}
          role="button"
          tabIndex={0}
          aria-label={`Ver produtos de ${product.query}`}
          onKeyDown={(e) => e.key === "Enter" && handleClick(product)}
        >
          <Card className="overflow-hidden h-full">
            <div className="relative aspect-[4/3]">
              <img
                src={product.src}
                alt={product.text}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    NOVO
                  </span>
                )}
                {product.category && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
            </div>
            
            {withTextOverlay && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-medium line-clamp-2">
                  {product.text}
                </p>
                <button 
                  className="mt-2 text-sm text-white hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(product);
                  }}
                >
                  Buscar produtos
                </button>
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;