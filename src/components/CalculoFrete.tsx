// components/CalculoFrete.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CalculoFreteProps {
  cepDestino: string;
  loadingFrete: boolean;
  erroFrete: string | null;
  onCepChange: (cep: string) => void;
  onCalcularFrete: () => void;
}

export const CalculoFrete = ({
  cepDestino,
  loadingFrete,
  erroFrete,
  onCepChange,
  onCalcularFrete,
}: CalculoFreteProps) => {
  const formatarCep = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 5) {
      return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
    }
    return numericValue;
  };

  return (
    <div className="pt-4 border-t">
      <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
        CEP de entrega *
      </label>
      <div className="flex gap-2">
        <Input
          id="cep"
          type="text"
          placeholder="Digite seu CEP (00000-000)"
          value={formatarCep(cepDestino)}
          onChange={(e) => onCepChange(e.target.value.replace(/\D/g, '').slice(0, 8))}
          className="flex-1"
          aria-describedby="cepHelp"
          maxLength={9}
        />
        {/* <Button 
          onClick={onCalcularFrete} 
          disabled={loadingFrete || cepDestino.length !== 8}
          className="bg-[#FFC601] hover:bg-[#e0a800]"
          aria-busy={loadingFrete}
        >
          {loadingFrete ? "Calculando..." : "Calcular"}
        </Button> */}
      </div>
      {erroFrete && (
        <p id="cepHelp" className="text-red-500 text-sm mt-1" role="alert">
          {erroFrete}
        </p>
      )}
    </div>
  );
};