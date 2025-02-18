import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Forget = () => {
  const [] = useState(false);
  const navigate = useNavigate();

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
          />

          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium" onClick={() => navigate("/newpass")}>
            ENVIAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Forget;
