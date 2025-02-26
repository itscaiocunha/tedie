import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    telefone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");  // Redireciona para a Home
      } else {
        setError(data.message || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro no servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col items-center justify-center">
      <div className="p-8">
        <Link to="/">
          <img src="/logo_tedie.svg" alt="Tedie" className="h-12 md:h-16" />
        </Link>
      </div>

      <div className="flex flex-col items-center w-full max-w-md bg-[#FFF1E6] rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2">👋 Olá! Crie sua conta</h1>
          <p className="text-sm text-gray-600">MINHA CONTA</p>
        </div>

        <div className="flex justify-between mb-8 w-full">
          <Link 
            to="/login"
            className="pb-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            LOG IN
          </Link>
          <Link 
            to="/register"
            className="pb-2 text-red-500 border-b-2 border-red-500"
          >
            CADASTRO
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Input
            type="text"
            name="nome"
            placeholder="Nome completo"
            className="bg-white border-0"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="bg-white border-0"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            className="bg-white border-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="telefone"
            placeholder="Telefone"
            className="bg-white border-0"
            value={formData.telefone}
            onChange={handleChange}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              className="bg-white border-0 pr-10"
              value={formData.senha}
              onChange={handleChange}
              required
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
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
          >
            CADASTRAR
          </Button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm text-gray-500 hover:text-yellow-500 transition-colors underline"
            >
              Já possuo cadastro
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
