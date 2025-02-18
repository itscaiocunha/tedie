import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
          <h1 className="text-2xl font-medium mb-2">👋 Olá novamente</h1>
          <p className="text-sm text-gray-600">MINHA CONTA</p>
        </div>

        <div className="flex justify-between mb-8 w-full">
          <Link 
            to="/login"
            className="pb-2 text-red-500 border-b-2 border-red-500"
          >
            LOG IN
          </Link>
          <Link 
            to="/register"
            className="pb-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            CADASTRO
          </Link>
        </div>

        <div className="space-y-4 w-full">
          <Input
            type="email"
            placeholder="E-mail"
            className="bg-white border-0"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="bg-white border-0 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>

          <div className="text-right w-full">
            <Link 
              to="/forget" 
              className="text-xs text-gray-500 hover:text-yellow-500 transition-colors"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
            ENTRAR
          </Button>

          <div className="text-center">
            <Link 
              to="/register" 
              className="text-sm text-gray-500 hover:text-yellow-500 transition-colors underline"
            >
              Não possuo cadastro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
