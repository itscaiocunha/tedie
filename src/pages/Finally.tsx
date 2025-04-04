import { useEffect, useState } from "react";
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
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("Usuário não autenticado");
        }

        const response = await fetch(
          `https://tedie-api.vercel.app/api/pedidos?id=${userId}`
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (
          !data ||
          !data.success ||
          !Array.isArray(data.data) ||
          data.data.length === 0
        ) {
          throw new Error("Nenhum pedido encontrado");
        }

        // Pega o pedido mais recente (assumindo que o primeiro da lista é o mais recente)
        const latestOrder = data.data[0];
        setOrderId(latestOrder.id.toString());
      } catch (err) {
        console.error("Erro ao buscar pedido:", err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFF8F3]">
        <Header
          user={user}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
        />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center flex-grow mt-32">
          <p>Carregando informações do pedido...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFF8F3]">
        <Header
          user={user}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
        />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center flex-grow mt-32">
          <p className="text-red-500">Erro: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      {/* Success Message */}

      <div className="max-w-4xl mx-auto px-4 py-24 text-center flex-grow mt-16 md:mt-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
          PEDIDO REALIZADO COM SUCESSO
        </h1>
        <div className="bg-yellow-50 rounded-lg py-2 px-4 inline-block mb-8"></div>
        <p className="text-xl mb-2">
          Obrigado, seu pedido foi realizado com sucesso!
        </p>

        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center">
            <Check className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-8">
          <Button
            className="bg-[#FFC600] text-white hover:bg-[#c79b00] w-full max-w-xs mx-auto md:mx-0 py-6 text-base font-medium"
            onClick={() => (window.location.href = "/")}
          >
            CONTINUAR COMPRANDO
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white w-full max-w-xs mx-auto md:mx-0 py-6 text-base font-medium"
            onClick={() => (window.location.href = "/perfil")}
          >
            VER MEUS PEDIDOS
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Finally;
