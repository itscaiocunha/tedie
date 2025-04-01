import { Card } from "../ui/card";

interface ProductGridProps {
  products: Array<{
    src: string;
    text: string;
    query: string;
    refrigerado?: boolean; // Adicione esta linha
  }>;
  onCardClick: (query: string) => void;
}

const ProductGrid = ({ products, onCardClick }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <Card>
            <div className="relative aspect-square rounded-lg">
              <img
                src={product.src}
                alt={`Sugestão ${index + 1}`}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300 rounded-lg"
                loading="lazy"
              />
              {product.refrigerado && (
                <span className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-sm">
                  🧊
                </span>
              )}
            </div>
            <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-full shadow-md">
              <p className="text-xs text-gray-700">{product.text}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;