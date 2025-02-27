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
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);

  // Calcular frete
  const calcularFrete = async () => {
    if (!cepDestino) return;
    setLoadingFrete(true);
    setErroFrete(null);

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
      const opcoesPagas = data.filter((opcao) => opcao.price > 0);
      setFrete(opcoesPagas);
    } catch (error) {
      setErroFrete("Erro ao calcular frete. Tente novamente.");
    } finally {
      setLoadingFrete(false);
    }
  };

  const [mensagem, setMensagem] = useState("");
  // Aplicar cupom de desconto
  const aplicarCupom = async () => {
  if (!cupom.trim()) {
    setMensagem("Por favor, insira um cupom válido.");
    return;
  }

  try {
    const response = await fetch("https://tedie-api.vercel.app/api/cupom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo: cupom }),
    });

    if (!response.ok) throw new Error("Cupom inválido");

    const data = await response.json();

    if (data && data.desconto) {
      setDesconto(data.desconto);
      setMensagem(`Cupom aplicado! Desconto de ${data.desconto}%`);
    } else {
      setDesconto(0);
      setMensagem("Cupom inválido ou expirado.");
    }
  } catch (error) {
    setDesconto(0);
    setMensagem("Erro ao validar cupom. Tente novamente.");
  }
};

  // Calcular totais
  const totalProdutos = itens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  const totalCompra = totalProdutos + (freteSelecionado ? parseFloat(freteSelecionado.price) : 0) - desconto;

  // Concluir compra
  const concluirCompra = () => {
    if (!freteSelecionado) {
      alert("Selecione uma opção de frete antes de concluir a compra.");
      return;
    }
    navigate("/address");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* Header */}
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

      {/* Conteúdo */}
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

            {/* Cálculo de Frete */}
            <div className="space-y-4 pt-6 border-t">
              <label className="block text-sm text-yellow-400">Calcular Frete</label>
              <Input type="text" placeholder="Digite seu CEP" value={cepDestino} onChange={(e) => setCepDestino(e.target.value)} />
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 mt-2" onClick={calcularFrete} disabled={loadingFrete}>
                {loadingFrete ? "Calculando..." : "Calcular"}
              </Button>
              {erroFrete && <p className="text-red-500 text-sm">{erroFrete}</p>}
              {frete && frete.map((opcao) => (
                <button key={opcao.company.id} className={`block w-full p-2 border ${freteSelecionado === opcao ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} onClick={() => setFreteSelecionado(opcao)}>
                  {opcao.company.name}: R$ {opcao.price}
                </button>
              ))}
            </div>

            {/* Cupom */}
            <Input type="text" placeholder="Digite seu cupom" value={cupom} onChange={(e) => setCupom(e.target.value)} />
            {mensagem && <p>{mensagem}</p>}
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={aplicarCupom}>Aplicar</Button>

            {/* Total */}
            <div className="flex justify-between items-center pt-6 border-t">
              <span className="font-medium">TOTAL:</span>
              <span className="text-red-500 font-medium text-xl">R$ {totalCompra.toFixed(2)}</span>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium" onClick={concluirCompra}>
              CONCLUIR COMPRA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
