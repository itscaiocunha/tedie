import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useCarrinho } from "../context/CarrinhoContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { itens } = useCarrinho();
  const [cepDestino, setCepDestino] = useState("");
  const [frete, setFrete] = useState(null);
  const [loadingFrete, setLoadingFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState(null);

  const calcularFrete = async () => {
    if (!cepDestino) return;
    setLoadingFrete(true);
    setErroFrete(null);
    setFrete(null);

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: { postal_code: "13874138" },
          to: { postal_code: cepDestino },
          package: { height: 10, width: 20, length: 15, weight: 1 },
        }),
      });

      if (!response.ok) throw new Error("Erro ao calcular frete");

      const data = await response.json();
      setFrete(data);
    } catch (error) {
      setErroFrete("Erro ao calcular frete. Tente novamente.");
    } finally {
      setLoadingFrete(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <header className="top-0 w-full bg-[#FFF8F3] border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <Link to="/">
            <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-red-500 hover:text-yellow-500">PRODUTOS</Link>
            <Link to="/brands" className="text-red-500 hover:text-yellow-500">MARCAS</Link>
            <Link to="/about" className="text-red-500 hover:text-yellow-500">SOBRE NÓS</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-yellow-500" onClick={() => navigate("/checkout")}> 
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="p-2 hover:text-yellow-500" onClick={() => navigate("/login")}> 
              <User className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-medium mb-8">RESUMO DO PEDIDO</h2>
          <div className="space-y-6">
            {itens.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img src={item.imagem} alt={item.nome} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{item.nome}</h3>
                  <span className="text-gray-600">{item.quantidade} x R$ {item.preco.toFixed(2)}</span>
                </div>
                <span className="ml-auto font-semibold">R$ {(item.quantidade * item.preco).toFixed(2)}</span>
              </div>
            ))}

            <div className="space-y-4 pt-6 border-t">
              <div>
                <label className="block text-sm mb-2 text-yellow-400">Calcular Frete</label>
                <Input 
                  type="text" 
                  placeholder="Digite seu CEP"
                  className="max-w-[200px]"
                  value={cepDestino}
                  onChange={(e) => setCepDestino(e.target.value)}
                />
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white px-6 mt-2"
                  onClick={calcularFrete}
                  disabled={loadingFrete}
                >
                  {loadingFrete ? "Calculando..." : "Calcular"}
                </Button>

                {erroFrete && <p className="text-red-500 text-sm mt-2">{erroFrete}</p>}

                {frete && (
                  <div className="mt-2 text-sm">
                    {frete.length > 0 ? (
                      frete.map((opcao) => (
                        <p key={opcao.company.id}>
                          {opcao.company.name}: R$ {opcao.price}
                        </p>
                      ))
                    ) : (
                      <p className="text-red-500">Nenhuma opção disponível</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <span className="font-medium">TOTAL:</span>
              <span className="text-red-500 font-medium text-xl">R$ 8.23</span>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium" onClick={() => navigate("/address")}>
              CONCLUIR COMPRA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
