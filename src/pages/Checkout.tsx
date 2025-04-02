import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "../hooks/useDebounce";
import { ModalConfirmacao } from "../components/ModalConfirmacao";
import { useCarrinhoManager } from "../hooks/useCarrinhoManager";
import { CarrinhoItem } from "../components/CarrinhoItem";
import { CalculoFrete } from "../components/CalculoFrete";
import { FreteOption, ProductItem } from "../types/checkoutTypes";
import Header from "../components/Header/Header";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import { Email } from "../components/Email";

interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const Checkout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Estados do email
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("emailCheckout") || "";
  });
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);

  // Função para formatar moeda
  const formatarMoedas = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).replace(/\./g, '|')
      .replace(/,/g, '.')
      .replace(/\|/g, ',');
  };

  // Função para submeter email
  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      setErrorEmail("Por favor, insira um e-mail válido");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorEmail("Formato de e-mail inválido");
      return;
    }

    setLoadingEmail(true);
    setErrorEmail(null);

    try {
      localStorage.setItem("emailCheckout", email);
      toast.success("E-mail salvo com sucesso!");
    } catch (error) {
      setErrorEmail("Erro ao salvar e-mail");
      console.error("Erro ao salvar email:", error);
    } finally {
      setLoadingEmail(false);
    }
  };

  // Função para sincronizar carrinho com a API
  const syncCarrinhoAPI = useCallback(async (itensParaSync: ProductItem[]) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("Usuário não autenticado - sincronização local apenas");
      return itensParaSync;
    }

    try {
      const itensParaAPI = itensParaSync.map(item => ({
        produto_id: item.id,
        nome: item.nome || "Produto sem nome",
        quantidade: Number(item.quantidade) || 1,
        preco: Number(item.preco) || 0,
        imagem: item.imagem || "",
      }));

      const response = await fetch("https://tedie-api.vercel.app/api/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: parseInt(userId, 10),
          itens: itensParaAPI,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao sincronizar carrinho");
      }

      const data = await response.json();
      return data.itens || itensParaSync;
    } catch (error) {
      console.error("Erro na sincronização:", error);
      throw error;
    }
  }, []);

  // Hook useCarrinhoManager usando a função syncCarrinhoAPI
  const {
    itens,
    setItens,
    adicionarItem,
    atualizarQuantidade,
    modalExclusao,
    abrirModalExclusao,
    fecharModalExclusao,
    confirmarExclusao,
    isSyncing,
  } = useCarrinhoManager([], syncCarrinhoAPI);

  // Estados do componente
  const [cepDestino, setCepDestino] = useState(() => {
    const savedCep = localStorage.getItem("cepDestino");
    return savedCep && /^\d{8}$/.test(savedCep) ? savedCep : "";
  });
  
  const [frete, setFrete] = useState<FreteOption[]>(() => {
    try {
      const storedFrete = localStorage.getItem("frete");
      return storedFrete ? JSON.parse(storedFrete) : [];
    } catch {
      return [];
    }
  });
  
  const [loadingFrete, setLoadingFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState<string | null>(null);
  
  const [freteSelecionado, setFreteSelecionado] = useState<FreteOption | null>(() => {
    try {
      const storedFrete = localStorage.getItem("freteSelecionado");
      return storedFrete ? JSON.parse(storedFrete) : null;
    } catch {
      return null;
    }
  });
  
  const [cupom, setCupom] = useState(() => {
    return localStorage.getItem("cupom") || "";
  });
  
  const [desconto, setDesconto] = useState(() => {
    const savedDesconto = parseFloat(localStorage.getItem("desconto") || "0");
    return isNaN(savedDesconto) ? 0 : savedDesconto;
  });
  
  const [mensagem, setMensagem] = useState("");

  // Endereço de entrega
  const [endereco, setEndereco] = useState<Endereco>(() => {
    const savedEndereco = localStorage.getItem("enderecoEntrega");
    return savedEndereco ? JSON.parse(savedEndereco) : {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: ""
    };
  });
  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);

  const debouncedCep = useDebounce(cepDestino, 1000);

  // Carregar carrinho inicial
  const loadCarrinho = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      let carrinhoItens: ProductItem[] = [];

      // Carregar do localStorage para exibição imediata
      const localItems = localStorage.getItem("itensCarrinho");
      if (localItems) {
        carrinhoItens = JSON.parse(localItems);
      }

      // Se logado, buscar da API e fazer merge
      if (token && userId) {
        const response = await fetch(
          `https://tedie-api.vercel.app/api/carrinho?usuario_id=${userId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.itens) {
            carrinhoItens = [
              ...carrinhoItens.filter(
                localItem => !data.itens.some((apiItem: ProductItem) => apiItem.id === localItem.id)
              ),
              ...data.itens
            ];
          }
        }
      }

      return carrinhoItens;
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      return [];
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  // Buscar endereço pelo CEP
  const buscarEnderecoPorCEP = useCallback(async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("CEP não encontrado");
      
      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado");

      setEndereco(prev => ({
        ...prev,
        cep: data.cep.replace("-", ""),
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }));

      setMostrarFormEndereco(true);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      toast.error("CEP não encontrado. Preencha manualmente.");
      setMostrarFormEndereco(true);
    }
  }, []);

  // Calcular frete
  const calcularFrete = useCallback(async () => {
    if (!/^\d{8}$/.test(cepDestino)) {
      setErroFrete("CEP inválido. Digite 8 números.");
      return;
    }

    setLoadingFrete(true);
    setErroFrete(null);

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: { postal_code: "13874138" }, // CEP da loja
          to: { postal_code: cepDestino },
          package: { height: 10, width: 20, length: 15, weight: 1 },
        }),
      });

      if (!response.ok) throw new Error("Erro ao calcular frete");

      const data = await response.json() as FreteOption[];
      const fretesFiltrados = data.filter(
        opcao => (opcao.company.name.toLowerCase().includes("correios") ||
                 opcao.company.name.toLowerCase().includes("sedex")) &&
                 opcao.price > 0
      );

      if (fretesFiltrados.length === 0) {
        throw new Error("Nenhuma opção de frete disponível");
      }

      setFrete(fretesFiltrados);
    } catch (error) {
      setErroFrete(error instanceof Error ? error.message : "Erro desconhecido");
      toast.error("Erro ao calcular frete");
    } finally {
      setLoadingFrete(false);
    }
  }, [cepDestino]);

  // Aplicar cupom de desconto
  const aplicarCupom = async () => {
    if (!cupom.trim()) {
      toast.error("Por favor, insira um cupom válido.");
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
      const msg = data.desconto 
        ? `Cupom aplicado! Desconto de ${data.desconto}%` 
        : "Cupom inválido ou expirado.";
      setMensagem(msg);
      toast.success(msg);
    } catch (error) {
      setDesconto(0);
      setMensagem(error instanceof Error ? error.message : "Erro desconhecido");
      toast.error("Erro ao aplicar cupom");
    }
  };

  // Efeitos
  useEffect(() => {
    const initializeCarrinho = async () => {
      const loadedItems = await loadCarrinho();
      setItens(loadedItems);
    };

    initializeCarrinho();
  }, [loadCarrinho, setItens]);

  useEffect(() => {
    if (debouncedCep && /^\d{8}$/.test(debouncedCep)) {
      calcularFrete();
      buscarEnderecoPorCEP(debouncedCep);
    }
  }, [debouncedCep, calcularFrete, buscarEnderecoPorCEP]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "itensCarrinho" && e.newValue) {
        const newItems = JSON.parse(e.newValue);
        if (JSON.stringify(newItems) !== JSON.stringify(itens)) {
          setItens(newItems);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [itens, setItens]);

  // Persistência no localStorage
  useEffect(() => {
    localStorage.setItem("cepDestino", cepDestino);
    localStorage.setItem("frete", JSON.stringify(frete));
    localStorage.setItem("freteSelecionado", JSON.stringify(freteSelecionado));
    localStorage.setItem("cupom", cupom);
    localStorage.setItem("desconto", desconto.toString());
    localStorage.setItem("itensCarrinho", JSON.stringify(itens));
    localStorage.setItem("enderecoEntrega", JSON.stringify(endereco));
    localStorage.setItem("emailCheckout", email);
  }, [cepDestino, frete, freteSelecionado, cupom, desconto, itens, endereco, email]);

  // Funções auxiliares
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEndereco(prev => ({ ...prev, [name]: value }));
  };

  // Cálculos financeiros
  const totalProdutos = itens.reduce((total, item) => 
    total + (Number(item.quantidade) * Number(item.preco)), 0);
  const valorFrete = freteSelecionado ? Number(freteSelecionado.price) : 0;
  const valorDesconto = (totalProdutos + valorFrete) * (Number(desconto) / 100);
  const totalCompra = totalProdutos + valorFrete - valorDesconto;

  const concluirCompra = () => {
    if (itens.length === 0) {
      toast.error("Adicione itens ao carrinho antes de finalizar");
      return;
    }

    if (!freteSelecionado) {
      toast.error("Selecione uma opção de frete");
      return;
    }

    if (!endereco.logradouro || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      toast.error("Preencha todos os campos obrigatórios do endereço");
      return;
    }

    navigate("/payment");
  };

  if (isLoading && isInitialLoad) {
    return (
      <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center">
        <div className="text-center">
          <p>Carregando seu carrinho...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      <div className="max-w-3xl mx-auto px-4 py-12 mt-28">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl font-medium mb-8">RESUMO DO PEDIDO</h1>
          
          {itens.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
              <Link to="/" className="text-red-500 hover:underline">
                Voltar para a loja
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Lista de Itens */}
              <ul className="space-y-6">
                {itens.map((item) => (
                  <li key={item.id}>
                    <CarrinhoItem 
                      item={item} 
                      onRemove={abrirModalExclusao} 
                      formatarMoeda={formatarMoeda} 
                      onUpdateQuantity={atualizarQuantidade}
                    />
                  </li>
                ))}
              </ul>

              {/* Email de Confirmação */}
              <Email
                email={email}
                setEmail={setEmail}
                onEmailSubmit={handleEmailSubmit}
                loading={loadingEmail}
                error={errorEmail}
              />

              {/* Cálculo de Frete */}
              <CalculoFrete
                cepDestino={cepDestino}
                loadingFrete={loadingFrete}
                erroFrete={erroFrete}
                onCepChange={setCepDestino}
                onCalcularFrete={calcularFrete}
              />

              {/* Formulário de Endereço */}
              {mostrarFormEndereco && (
                <div className="space-y-4 border-t pt-4">
                  <h2 className="font-medium">Endereço de Entrega</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logradouro
                      </label>
                      <Input
                        name="logradouro"
                        value={endereco.logradouro}
                        onChange={handleEnderecoChange}
                        required
                      />
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número
                      </label>
                      <Input
                        name="numero"
                        value={endereco.numero}
                        onChange={handleEnderecoChange}
                        required
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento
                      </label>
                      <Input
                        name="complemento"
                        value={endereco.complemento}
                        onChange={handleEnderecoChange}
                      />
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro
                      </label>
                      <Input
                        name="bairro"
                        value={endereco.bairro}
                        onChange={handleEnderecoChange}
                        required
                      />
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <Input
                        name="cidade"
                        value={endereco.cidade}
                        onChange={handleEnderecoChange}
                        required
                      />
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <Input
                        name="estado"
                        value={endereco.estado}
                        onChange={handleEnderecoChange}
                        required
                        maxLength={2}
                      />
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <Input
                        name="cep"
                        value={endereco.cep}
                        onChange={handleEnderecoChange}
                        required
                        maxLength={8}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Opções de Frete */}
              {frete.length > 0 && (
                <div className="space-y-2">
                  <h2 className="font-medium">Opções de Frete:</h2>
                  <div className="space-y-2">
                    {frete.map((opcao) => (
                      <button
                        key={opcao.company.id}
                        className={`block w-full p-3 text-left rounded border transition-colors ${
                          freteSelecionado?.company.id === opcao.company.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setFreteSelecionado(opcao)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{opcao.company.name}</span>
                          <span className="font-medium">R$ {formatarMoedas(opcao.price)}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Prazo estimado: {opcao.delivery_time} dias úteis
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cupom de Desconto */}
              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cupom de desconto
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Digite seu cupom"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={aplicarCupom} 
                    disabled={!cupom.trim()}
                    className="bg-[#FFC601] hover:bg-[#e0a800]"
                  >
                    Aplicar
                  </Button>
                </div>
                {mensagem && (
                  <p className={`text-sm mt-1 ${
                    mensagem.includes('aplicado') ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {mensagem}
                  </p>
                )}
              </div>

              {/* Resumo Financeiro */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">{formatarMoeda(totalProdutos)}</span>
                </div>
                {freteSelecionado && (
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className="font-medium">{formatarMoeda(valorFrete)}</span>
                  </div>
                )}
                {desconto > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({desconto}%):</span>
                    <span className="font-medium">-{formatarMoeda(valorDesconto)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t font-bold">
                  <span className="text-lg">TOTAL:</span>
                  <span className="text-red-500 text-xl">
                    {formatarMoeda(totalCompra)}
                  </span>
                </div>
              </div>

              {/* Botão Finalizar */}
              <Button 
                onClick={concluirCompra} 
                className="w-full bg-[#FFC601] hover:bg-[#e0a800] py-6 text-lg"
                disabled={
                  !freteSelecionado || 
                  isSyncing || 
                  !endereco.logradouro || 
                  !endereco.numero || 
                  !endereco.bairro || 
                  !endereco.cidade || 
                  !endereco.estado
                }
              >
                {isSyncing ? "Sincronizando..." : "CONCLUIR COMPRA"}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <ModalConfirmacao
        isOpen={modalExclusao.isOpen}
        onClose={fecharModalExclusao}
        onConfirm={confirmarExclusao}
        title="Remover item do carrinho"
        message={`Tem certeza que deseja remover "${modalExclusao.itemNome}" do seu carrinho?`}
      />
      <Footer />
    </div>
  );
};

export default Checkout;