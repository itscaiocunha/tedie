
import { Link } from "react-router-dom";
import { Check, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const Finally = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <header className="top-0 w-full bg-[#FFF8F3] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/products" className="text-red-500 hover:text-yellow-500 transition-colors">PRODUTOS</a>
            <a href="/brands" className="text-red-500 hover:text-yellow-500 transition-colors">MARCAS</a>
            <a href="/about" className="text-red-500 hover:text-yellow-500 transition-colors">SOBRE NÓS</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:text-yellow-500 transition-colors"
              onClick={() => window.location.href ="/checkout"}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button 
              className="p-2 hover:text-yellow-500 transition-colors"
              onClick={() => window.location.href = "/login"}
            >
              <User className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Success Message */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center flex-grow">
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
      <footer className="mt-auto py-8 px-2 border-t-4 border-yellow-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <img src="/logo_tedie.svg" alt="Logo" className="h-12" />
          <div className="flex space-x-8 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-yellow-500 transition-colors">PRIVACIDADE</a>
            <a href="/terms" className="hover:text-yellow-500 transition-colors">TERMOS E CONDIÇÕES</a>
            <a href="/creators" className="hover:text-yellow-500 transition-colors">PROGRAMA CREATORS</a>
          </div>
          <p className="text-gray-500">© {new Date().getFullYear()} Tedie. Simples assim!</p>
        </div>
      </footer>
    </div>
  );
};

export default Finally;