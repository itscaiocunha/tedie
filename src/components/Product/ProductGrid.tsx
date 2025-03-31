import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
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
      navigate(`/search?q=${encodeURIComponent(product.query)}`);
    }
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-6`}>
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="relative group cursor-pointer"
          whileHover={{ y: -5 }}
          onClick={() => handleClick(product)}
          role="button"
          tabIndex={0}
          aria-label={`Ver produtos de ${product.query}`}
          onKeyDown={(e) => e.key === "Enter" && handleClick(product)}
        >
          <Card className="overflow-hidden h-full">
            <div className="relative aspect-[4/3]">
              <motion.img
                src={product.src}
                alt={product.text}
                className="object-cover w-full h-full"
                loading="lazy"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                {product.isNew && (
                  <motion.span 
                    className="bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    NOVO
                  </motion.span>
                )}
                {product.category && (
                  <motion.span 
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {product.category}
                  </motion.span>
                )}
              </div>
            </div>
            
            {withTextOverlay && (
              <motion.div 
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <p className="text-white font-medium line-clamp-2">
                  {product.text}
                </p>
                <motion.button 
                  className="mt-2 text-sm text-white hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(product);
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buscar produtos
                </motion.button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;