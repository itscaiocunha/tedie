import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Address = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [address, setAddress] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const storedItems = JSON.parse(localStorage.getItem("itensCarrinho") || "[]");
      const storedFrete = localStorage.getItem("freteValor");

      const subtotal = storedItems.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
      const freteValor = parseFloat(storedFrete) || 0;

      const totalCalculado = subtotal + freteValor;
      setTotal(totalCalculado);

      // Salvar o total no localStorage
      localStorage.setItem("totalCompra", totalCalculado.toFixed(2));

      console.log("Subtotal:", subtotal);
      console.log("Frete:", freteValor);
      console.log("Total salvo no localStorage:", totalCalculado);
    } catch (error) {
      console.error("Erro ao calcular total:", error);
      setTotal(0);
    }
  }, []);

  const sanitizeCep = (cep: string) => cep.replace(/\D/g, "");

  useEffect(() => {
    const storedCep = localStorage.getItem("cepDestino");
    if (storedCep) {
      const sanitizedCep = sanitizeCep(storedCep);
      setCep(sanitizedCep);
      fetchAddress(sanitizedCep);
    }
  }, []);

  const fetchAddress = async (cepValue = cep) => {
    if (cepValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress((prev) => ({
            ...prev,
            rua: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          }));
        } else {
          setMessage({ type: "error", text: "CEP não encontrado." });
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setMessage({ type: "error", text: "Erro ao buscar CEP." });
      }
    }
  };

  const saveAddress = async () => {
    if (!cep || !address.rua || !address.numero || !address.bairro || !address.cidade || !address.estado) {
      setMessage({ type: "error", text: "Preencha todos os campos obrigatórios!" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/endereco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Logradouro: address.rua,
          Numero: address.numero,
          Complemento: address.complemento,
          Bairro: address.bairro,
          Cidade: address.cidade,
          Estado: address.estado,
          CEP: cep,
          Pais: "Brasil",
        }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Endereço salvo com sucesso!" });

        // Garantir que o total atualizado esteja salvo no localStorage antes de redirecionar
        localStorage.setItem("totalCompra", total.toFixed(2));

        setTimeout(() => (window.location.href = "/payment"), 2000);
      } else {
        setMessage({ type: "error", text: "Erro ao salvar endereço." });
      }
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      setMessage({ type: "error", text: "Erro interno ao salvar endereço." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <Header 
        user={user} 
        onLogout={logout} 
        isAuthenticated={isAuthenticated} 
      />
      <div className="max-w-3xl mx-auto px-4 py-12 mt-32">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-medium mb-8">ENDEREÇO</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">CEP</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(sanitizeCep(e.target.value))}
                  onBlur={() => fetchAddress(sanitizeCep(cep))}
                  className="max-w-[200px]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => fetchAddress(sanitizeCep(cep))}>
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">RUA</label>
                <Input type="text" value={address.rua} readOnly className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm mb-2">BAIRRO</label>
                <Input type="text" value={address.bairro} readOnly className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm mb-2">NÚMERO</label>
                <Input
                  type="text"
                  value={address.numero}
                  onChange={(e) => setAddress((prev) => ({ ...prev, numero: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">COMPLEMENTO</label>
                <Input
                  type="text"
                  value={address.complemento}
                  onChange={(e) => setAddress((prev) => ({ ...prev, complemento: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">CIDADE</label>
                <Input type="text" value={address.cidade} readOnly className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm mb-2">ESTADO</label>
                <Input type="text" value={address.estado} readOnly className="bg-gray-100" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <span className="font-medium">TOTAL:</span>
              <span className="text-red-500 font-medium text-xl">R$ {total.toFixed(2)}</span>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium flex justify-center items-center" onClick={saveAddress}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "FINALIZAR"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Address;
