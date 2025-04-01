import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetalhesProduto from "../components/DetalhesProduto";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

interface User {
  name: string;
  email: string;
}

const ProdutoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [user, setUser] = React.useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!id) {
    return (
      <div className="min-h-screen bg-[#FBF8F4] flex flex-col">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          isAuthenticated={isAuthenticated} 
        />
        
        <main className="flex-1 pt-24 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center space-y-6">
            <div>
              <img 
                src="/image/notfound.png" 
                alt="Teddie not found" 
                className="mx-auto w-64 h-auto mb-6 object-contain"
              />
              <h2 className="text-xl font-medium text-gray-800">
                Produto não encontrado
              </h2>
              <p className="text-gray-600 mt-2">
                O ID do produto não foi fornecido ou é inválido.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mx-auto px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Voltar para a loja
            </button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F4] flex flex-col">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated} 
      />
      
      <main className="flex-1 pt-24">
        <DetalhesProduto productId={Number(id)} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProdutoPage;