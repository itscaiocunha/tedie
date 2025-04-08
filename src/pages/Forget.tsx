import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // ou outro library de notificação que você estiver usando

const Forget = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Por favor, insira seu e-mail");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("https://tedie-api.vercel.app/api/esqueceu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao enviar e-mail");
      }

      toast.success("Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
        {
          style: {
            background: "#FFC500",
            color: "#000000",
          },
          duration: 5000,
        }
      );
    } catch (error) {
      console.error("Erro:", error);
      toast.error(error.message || "Ocorreu um erro ao enviar o e-mail");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="p-8">
        <Link to="/">
          <img 
            src="/logo_tedie.svg" 
            alt="Tedie" 
            className="h-12 md:h-16"
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-md bg-[#FFF1E6] rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2">Esqueceu sua senha?</h1>
          <p className="text-sm text-gray-600">Digite seu e-mail</p>
        </div>

        <div className="space-y-4 w-full">
          <Input
            type="email"
            placeholder="E-mail"
            className="bg-white border-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "ENVIANDO..." : "ENVIAR"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Forget;
