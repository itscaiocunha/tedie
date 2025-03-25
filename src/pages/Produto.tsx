import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetalhesProduto from "../components/DetalhesProduto";
import { ShoppingCart, User } from "lucide-react";

const ProdutoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <p>ID do produto não fornecido.</p>;

  return (
    <div className="min-h-screen bg-[#FBF8F4]"> 

      {/* Header Centralizado */}
      <header className="fixed top-0 w-full bg-[#FBF8F4] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-20">
          <div className="w-full flex items-center justify-between">
            <div className="flex-shrink-0">
              <a href="/">
                <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
            <a href="/creator" className="text-red-500 hover:text-yellow-500 transition-colors">CREATOR</a>
            <a href="/about" className="text-red-500 hover:text-yellow-500 transition-colors">SOBRE NÓS</a>
          </nav>
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 hover:text-yellow-500 transition-colors"
                onClick={() => navigate("/checkout")}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button 
                className="p-2 hover:text-yellow-500 transition-colors"
                onClick={() => navigate("/login")}
              >
                <User className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="mt-24">
        <DetalhesProduto productId={parseInt(id)} />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4 border-yellow-200 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <img src="/logo_tedie.svg" alt="Logo" className="h-12" />
          <div className="flex space-x-8 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-yellow-500 transition-colors">PRIVACIDADE</a>
            <a href="/terms" className="hover:text-yellow-500 transition-colors">TERMOS E CONDIÇÕES</a>
            <a href="/creator" className="hover:text-yellow-500 transition-colors">PROGRAMA CREATORS</a>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Tedie. Simples assim!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProdutoPage;
