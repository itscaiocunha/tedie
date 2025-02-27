import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User, Loader2 } from "lucide-react";

const Address = () => {
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

  const fetchAddress = async () => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
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
      <div className="max-w-3xl mx-auto px-4 py-12">
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
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={fetchAddress}
                  className="max-w-[200px]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={fetchAddress}>
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

            {message.text && (
              <div className={`text-center p-2 rounded ${message.type === "success" ? "text-green-700 bg-green-200" : "text-red-700 bg-red-200"}`}>
                {message.text}
              </div>
            )}

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium flex justify-center items-center" onClick={saveAddress} 
            // disabled={loading}
            >
              {/* {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : */}
               FINALIZAR
               {/* } */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
