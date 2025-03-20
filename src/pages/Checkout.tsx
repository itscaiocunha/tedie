import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "../context/CarrinhoContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { itens, setItens } = useCarrinho();

  const [cepDestino, setCepDestino] = useState(localStorage.getItem("cepDestino") || "");
  const [frete, setFrete] = useState(() => JSON.parse(localStorage.getItem("frete")) || []);
  const [loadingFrete, setLoadingFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState(null);
  const [freteSelecionado, setFreteSelecionado] = useState(() => JSON.parse(localStorage.getItem("freteSelecionado")) || null);
  const [cupom, setCupom] = useState(localStorage.getItem("cupom") || "");
  const [desconto, setDesconto] = useState(() => parseFloat(localStorage.getItem("desconto")) || 0);
  const [mensagem, setMensagem] = useState("");

  const salvarCarrinho = async (itens) => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("userId");

    if (!usuarioId) {
      console.error("Erro: ID de usuário não encontrado no localStorage");
      return;
    }

    try {
      const body = {
        usuario_id: parseInt(usuarioId, 10), // Garantindo que seja um número
        itens: itens.map((item) => ({
          produto_id: item.id,
          quantidade: item.quantidade,
        })),
      };

      const response = await fetch("https://tedie-api.vercel.app/api/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao salvar carrinho: ${errorMessage}`);
      }

      console.log("Carrinho salvo com sucesso!");
      console.log("Itens a serem salvos no carrinho:", JSON.stringify(body));
    } catch (error) {
      console.error("Erro ao salvar o carrinho:", error.message);
    }
  };

  useEffect(() => {
    if (itens.length > 0) {
      salvarCarrinho(itens);
    }
  }, [itens]);

  useEffect(() => {
    localStorage.setItem("cepDestino", cepDestino);
    localStorage.setItem("frete", JSON.stringify(frete));
    localStorage.setItem("freteSelecionado", JSON.stringify(freteSelecionado));
    if (freteSelecionado) {
      localStorage.setItem("freteValor", freteSelecionado.price.toString());
    }
    localStorage.setItem("cupom", cupom);
    localStorage.setItem("desconto", desconto.toString());
    localStorage.setItem("itensCarrinho", JSON.stringify(itens));
  }, [cepDestino, frete, freteSelecionado, cupom, desconto, itens]);

  const removerItem = (id) => {
    const novosItens = itens.filter(item => item.id !== id);
    setItens(novosItens);
  };

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

      // Filtrar apenas "Correios" e "Sedex"
      const fretesFiltrados = data.filter(
        (opcao) =>
          (opcao.company.name.toLowerCase().includes("correios") ||
            opcao.company.name.toLowerCase().includes("sedex")) &&
          opcao.price > 0
      );

      setFrete(fretesFiltrados);
    } catch (error) {
      setErroFrete("Erro ao calcular frete. Tente novamente.");
    } finally {
      setLoadingFrete(false);
    }
  };


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
      setDesconto(data.desconto || 0);
      setMensagem(data.desconto ? `Cupom aplicado! Desconto de ${data.desconto}%` : "Cupom inválido ou expirado.");
    } catch (error) {
      setDesconto(0);
      setMensagem("Erro ao validar cupom. Tente novamente.");
    }
  };

  const totalProdutos = itens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  const totalCompra = totalProdutos + (freteSelecionado ? parseFloat(freteSelecionado.price) : 0) - desconto;

  const concluirCompra = () => {
    if (!freteSelecionado) {
      alert("Selecione uma opção de frete antes de concluir a compra.");
      return;
    }
    navigate("/address");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <header className="fixed top-0 w-full bg-[#FBF8F4] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/creator" className="text-red-500 hover:text-yellow-500 transition-colors">CREATOR</a>
            <a href="/about" className="text-red-500 hover:text-yellow-500 transition-colors">SOBRE NÓS</a>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 mt-32">
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
                <button onClick={() => removerItem(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash size={20} />
                </button>
              </div>
            ))}
            <Input type="text" placeholder="Digite seu CEP" value={cepDestino} onChange={(e) => setCepDestino(e.target.value)} />
            <Button onClick={calcularFrete} disabled={loadingFrete} className="bg-[#FFC601] hover:bg-[#e0a800]">{loadingFrete ? "Calculando..." : "Calcular"}</Button>
            {frete.map((opcao) => (
              <button key={opcao.company.id} className={`block w-full p-2 border ${freteSelecionado?.company?.id === opcao.company.id ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} onClick={() => setFreteSelecionado(opcao)}>
                {opcao.company.name}: R$ {opcao.price}
              </button>
            ))}
            <Input type="text" placeholder="Digite seu cupom" value={cupom} onChange={(e) => setCupom(e.target.value)} />
            {mensagem && <p>{mensagem}</p>}
            <Button onClick={aplicarCupom} className="bg-[#FFC601] hover:bg-[#e0a800]">Aplicar</Button>
            <div className="flex justify-between items-center pt-6 border-t">
              <span className="font-medium">TOTAL:</span>
              <span className="text-red-500 font-medium text-xl">R$ {totalCompra.toFixed(2)}</span>
            </div>
            <Button onClick={concluirCompra} className="bg-[#FFC601] hover:bg-[#e0a800]">CONCLUIR COMPRA</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
