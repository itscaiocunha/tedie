import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";

interface SearchResultsProps {
  results: any[];
  query: string;
  onEmptyResults: () => JSX.Element;
}

const SearchResults = ({ results, query, onEmptyResults }: SearchResultsProps) => {
  if (results.length === 0) {
    return onEmptyResults();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {results.map((product) => (
        <Link 
          to={`/produto/${product.id}`} 
          key={product.id}
          aria-label={`Ver detalhes do produto ${product.nome}`}
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;