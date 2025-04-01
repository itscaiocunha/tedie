
import { Link } from "react-router-dom";
import { Check, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Finally = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <Header 
        user={user} 
        onLogout={logout} 
        isAuthenticated={isAuthenticated} 
      />

      {/* Success Message */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center flex-grow mt-32">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
          PEDIDO REALIZADO COM SUCESSO
        </h1>
        <div className="bg-yellow-50 rounded-lg py-2 px-4 inline-block mb-8">
          <p className="text-gray">ID DO PEDIDO: {1234567890}</p>
        </div>
        <p className="text-xl mb-2">
          Obrigado, seu pedido foi realizado com sucesso!
        </p>
        <p className="text-xl mb-12">Em breve, você receberá um e-mail com todos os detalhes</p>
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center">
            <Check className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            className="bg-[#FFC600] text-white hover:bg-red-100 w-full py-6 text-base font-medium"  
            onClick={() => window.location.href = "/"}
          >
            CONTINUAR COMPRANDO
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white w-full py-6 text-base font-medium"  
            onClick={() => window.location.href = "/order"}
          >
            ACOMPANHAR PEDIDO
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Finally;