import { Card } from "../ui/card";

interface ProductGridProps {
  products: Array<{
    src: string;
    text: string;
    query: string;
    refrigerado?: boolean;
  }>;
  onCardClick: (query: string) => void;
}

const ProductGrid = ({ products, onCardClick }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> {/* Reduzi o gap para 4 */}
      {products.map((product, index) => (
        <div
          key={index}
          className="relative overflow-hidden group transition-shadow cursor-pointer rounded-lg"
          onClick={() => onCardClick(product.query)}
          role="button"
          tabIndex={0}
          aria-label={`Buscar por ${product.query}`}
          onKeyDown={(e) => e.key === "Enter" && onCardClick(product.query)}
        >
          <Card className="border-none shadow-none">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={product.src}
                alt={`Sugestão ${index + 1}`}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              {product.refrigerado && (
                <span className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-sm">
                  🧊
                </span>
              )}
            </div>
            <div className="absolute top-4 left-4 bg-white rounded-md shadow-md px-2 py-1">
              <p className="text-[12px] font-light">MAIS PESQUISADO 🔥 </p> 
            </div>
            
            {/* Texto inferior */}
            <div className="absolute bottom-4 left-4 mr-5 bg-white px-3 py-1 rounded-md shadow-md">
              <p className="text-[12px] font-light">🔎 {product.text}</p> 
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;