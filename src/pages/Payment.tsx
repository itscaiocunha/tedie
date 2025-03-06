import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>(localStorage.getItem("paymentMethod") || "debit");
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState(localStorage.getItem("cardNumber") || "");
  const [cardName, setCardName] = useState(localStorage.getItem("cardName") || "");
  const [cardExpiry, setCardExpiry] = useState(localStorage.getItem("cardExpiry") || "");
  const [cardCvv, setCardCvv] = useState(localStorage.getItem("cardCvv") || "");

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalCompra");
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("paymentMethod", paymentMethod);
    localStorage.setItem("cardNumber", cardNumber);
    localStorage.setItem("cardName", cardName);
    localStorage.setItem("cardExpiry", cardExpiry);
    localStorage.setItem("cardCvv", cardCvv);
  }, [paymentMethod, cardNumber, cardName, cardExpiry, cardCvv]);

  // 🟢 Criar pagamento via PIX
  const createPixPayment = async () => {
    if (total <= 0) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, email: "caiocunha@w7agencia.com.br" }),
      });

      const data = await response.json();
      if (data.point_of_interaction?.transaction_data) {
        setPixQrCode(data.point_of_interaction.transaction_data.qr_code_base64 || "");
        setPixCode(data.point_of_interaction.transaction_data.qr_code || "");
      } else {
        setError("Erro ao gerar QR Code do PIX.");
      }
    } catch (error) {
      setError("Erro ao processar pagamento PIX.");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Criar pagamento via Cartão de Crédito
  const handleCardPayment = async () => {
    if (total <= 0) return;
    setLoading(true);
    setError(null);

    try {
      const [month, year] = cardExpiry.split("/");
      
      // Criar pagamento via cartão
      const paymentResponse = await fetch("https://tedie-api.vercel.app/api/cartao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer APP_USR-5763098801844065-100310-afc180e16c7578ff7db165987624522c-1864738419",
        },
        body: JSON.stringify({
          amount: total,
          email: "caiocunha@w7agencia.com.br",
          card_number: cardNumber,
          expiration_month: parseInt(month, 10),
          expiration_year: 2000 + parseInt(year, 10),
          security_code: cardCvv,
          cardholder_name: cardName,
          installments: 1,
          payment_method_id: "visa",
          identification: { type: "CPF", number: "12345678909" },
        }),
      });

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || "Erro ao processar pagamento.");
      }

      // Criar pedido após pagamento bem-sucedido
      const orderResponse = await fetch("https://tedie-api.vercel.app/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: 3, // Pode ser dinâmico caso tenha um sistema de autenticação
          total: total,
          itens: JSON.parse(localStorage.getItem("itensCarrinho") || "[]"),
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(orderData.message || "Erro ao registrar pedido.");
      }

      // Limpar dados após sucesso
      localStorage.removeItem("itensCarrinho");
      localStorage.removeItem("freteSelecionado");
      localStorage.removeItem("freteValor");
      localStorage.removeItem("desconto");
      localStorage.removeItem("totalCompra");
      localStorage.removeItem("cepDestino");
      
      navigate("/finally");
    } catch (error) {
      setError(error.message || "Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentMethod === "pix" && total > 0) {
      createPixPayment();
    }
  }, [paymentMethod, total]);

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
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12 mt-32">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-medium mb-8">MÉTODO DE PAGAMENTO</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            {["credit", "pix"].map((method) => (
              <div key={method} className={`border rounded-lg p-6 cursor-pointer ${paymentMethod === method ? "ring-2 ring-yellow-400" : ""}`}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={method} id={method} />
                  <Label htmlFor={method}>{method === "debit" ? "Cartão de Débito" : method === "credit" ? "Cartão de Crédito" : "PIX"}</Label>
                </div>
                {paymentMethod === "credit" && method === "credit" && (
                  <div className="mt-4 space-y-4">
                    <Input placeholder="Número do Cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <Input placeholder="Nome no Cartão" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <div className="flex space-x-4">
                      <Input placeholder="Validade (MM/AA)" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
                      <Input placeholder="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>

          {paymentMethod === "pix" && pixQrCode && pixCode && (
            <div className="bg-[#FFF1E6] rounded-lg p-6 text-center mt-6">
              <h3 className="text-lg font-semibold mb-4">Escaneie o QR Code para pagar</h3>
              <img src={`data:image/png;base64,${pixQrCode}`} alt="QR Code PIX" className="mx-auto w-48 h-48" />
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => navigator.clipboard.writeText(pixCode)}>
                Copiar Código PIX
              </Button>
            </div>
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium mt-6"
            onClick={handleCardPayment}
            disabled={loading}
          >
            {loading ? "Processando..." : "FINALIZAR PAGAMENTO"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
