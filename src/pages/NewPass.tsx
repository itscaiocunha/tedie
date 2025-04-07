import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // ou outro library de notificação que você estiver usando

const NewPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extrai o email da query string da URL
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const handleSubmit = async () => {
    // Validações
    if (!newPassword || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (!email) {
      toast.error("E-mail não encontrado. Por favor, solicite um novo link de redefinição.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/novasenha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          novaSenha: newPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Falha ao redefinir senha");
      }

      toast.success("Senha redefinida com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro:", error);
      toast.error(error.message || "Ocorreu um erro ao redefinir a senha");
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
          <h1 className="text-2xl font-medium mb-2">NOVA SENHA</h1>
          <p className="text-sm text-gray-600">Digite sua nova senha</p>
        </div>

        <div className="space-y-4 w-full">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Nova Senha"
              className="bg-white border-0 pr-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Repetir Senha"
              className="bg-white border-0 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>

          <Button 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "PROCESSANDO..." : "SALVAR NOVA SENHA"}
          </Button>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm text-gray-500 hover:text-yellow-500 transition-colors underline"
            >
              Voltar ao Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPass;