// components/CalculoFrete.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailProps {
  email: string;
  setEmail: (email: string) => void;
  onEmailSubmit: () => void;
  loading?: boolean;
  error?: string | null;
}

export const Email = ({
  email,
  setEmail,
  onEmailSubmit,
  loading,
  error
}: EmailProps) => {
  return (
    <div className="pt-4 border-t">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        E-mail de Confirmação *
      </label>
      <div className="flex gap-2">
        <Input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          className="flex-1"
          aria-describedby="emailhelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};