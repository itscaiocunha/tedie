import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchBar = ({ searchQuery, onSearchQueryChange, onSearch }: SearchBarProps) => {
  return (
    <form onSubmit={onSearch} className="text-center py-10">
      <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-4xl mx-auto">
        <Input
          type="text"
          placeholder="Digite qual seu desejo para hoje?"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          aria-label="Campo de busca"
        />
        <Button 
          type="submit" 
          variant="default"
          className="bg-[#FFC601] hover:bg-[#FFC601]"
          aria-label="Buscar produtos"
        >
          <Search className="mr-2" /> Consultar
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;