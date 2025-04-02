import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

type PaymentStatus = "pending" | "approved" | "rejected" | "cancelled";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit"); // Sem localStorage inicial

  const { user, logout, isAuthenticated } = useAuth();
  // Efeito para carregar do localStorage APÓS a renderização inicial
  useEffect(() => {
    if (paymentMethod) {
      // Só persiste se o valor não for nulo
      localStorage.setItem("paymentMethod", paymentMethod);
      if (paymentMethod === "pix") {
        createPixPayment();
      }
    }
  }, [paymentMethod]);

  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [pixId, setPixID] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState(
    localStorage.getItem("cardNumber") || ""
  );
  const [cardName, setCardName] = useState(
    localStorage.getItem("cardName") || ""
  );
  const [cardExpiry, setCardExpiry] = useState(
    localStorage.getItem("cardExpiry") || ""
  );
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

  useEffect(() => {
    if (pixId === null) {
      console.log("🔄 ID resetado, gerando novo PIX...");
      createPixPayment();
    }
  }, [pixId]); // Executa sempre que `pixId` for atualizado
  

  // 🟢 Criar pagamento via PIX
  const createPixPayment = async () => {
    if (total <= 0) return;
    if (pixId) return; // Evita criar múltiplos pagamentos PIX

    setLoading(true);
    setError(null);

    console.log("Criando pagamento PIX...");

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // 👈 Auth header
        },
        body: JSON.stringify({
          amount: 0.1,
          email: "caiocunha@w7agencia.com.br", // Substitua pelo email dinâmico
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro ao gerar PIX");

      // Guarde TODOS os dados relevantes
      setPixID(data.id); // ID essencial para verificação
      setPixQrCode(
        data.point_of_interaction?.transaction_data?.qr_code_base64 || ""
      );
      setPixCode(data.point_of_interaction?.transaction_data?.qr_code || "");
    } catch (error) {
      setError(error.message);
      toast.error("Falha ao criar pagamento PIX");
    } finally {
      setLoading(false);
    }
  };

  const handlePixConfirmation = async () => {
    if (!pixId) {
      toast.error("ID do PIX não encontrado");
      return;
    }

    setLoading(true);
    setError(null);
    let paymentApproved = false;
    const toastId = "pix-status"; // ID único para controle do toast

    try {
      // Configuração do polling
      const maxAttempts = 30;
      const interval = 5000;

      // Inicia o toast de loading
      toast.loading("Verificando status do pagamento...", {
        id: toastId,
        duration: Infinity,
      });

      // Função de verificação
      const checkPayment = async () => {
        const res = await fetch(
          `https://tedie-api.vercel.app/api/pix?id=${pixId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const data = await res.json();
        return data.status_pagamento === "approved";
      };

      // Polling com feedback visual
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        paymentApproved = await checkPayment();

        if (paymentApproved) {
          // Atualiza para toast de sucesso
          toast.success("Pagamento aprovado! Finalizando pedido...", {
            id: toastId,
          });
          break;
        }

        toast.loading(`Aguardando confirmação PIX...`, {
          id: toastId,
        });
        await new Promise((resolve) => setTimeout(resolve, interval));
      }

      if (!paymentApproved) {
        throw new Error(
          "Pagamento não confirmado no período esperado, por favor clique em 'Confirmar Pagamento' novamente."
        );
      }

      const orderResponse = await fetch(
        "https://tedie-api.vercel.app/api/pedido",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_id: 3,
            total: total,
            itens: JSON.parse(localStorage.getItem("itensCarrinho") || "[]"),
          }),
        }
      );

      if (!orderResponse.ok) {
        const orderData = await orderResponse.json();
        throw new Error(orderData.message || "Erro ao registrar pedido.");
      }

      // Limpa dados e navega
      localStorage.removeItem("itensCarrinho");
      localStorage.removeItem("freteSelecionado");
      localStorage.removeItem("freteValor");
      localStorage.removeItem("desconto");
      localStorage.removeItem("totalCompra");
      localStorage.removeItem("cepDestino");

      // Dismiss manual para garantir que o toast some
      toast.dismiss(toastId);
      navigate("/finally");
    } catch (error) {
      // Toast de erro com duração limitada
      toast.error(error.message || "Erro na conexão com o servidor.", {
        id: toastId,
        duration: 3000, // 3 segundos
      });
      setError(error.message);
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
      const paymentResponse = await fetch(
        "https://tedie-api.vercel.app/api/cartao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer APP_USR-5763098801844065-100310-afc180e16c7578ff7db165987624522c-1864738419",
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
        }
      );

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || "Erro ao processar pagamento.");
      }

      // Adicione isso no início do seu componente, com os outros estados
      const [userId, setUserId] = useState<number | null>(null);

      // Adicione este useEffect para carregar o ID do usuário quando o componente montar
      useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10));
        }
      }, []);

      // Criar pedido após pagamento bem-sucedido
      const orderResponse = await fetch(
        "https://tedie-api.vercel.app/api/pedido",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_id: userId,
            total: total,
            itens: JSON.parse(localStorage.getItem("itensCarrinho") || "[]"),
          }),
        }
      );

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

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      <div className="max-w-6xl mx-auto px-4 py-12 mt-32">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-medium mb-8">MÉTODO DE PAGAMENTO</h2>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(method) => {
              setPaymentMethod(method);
              if (method === "pix") {
                if (!pixId) {
                  createPixPayment(); // Chama automaticamente ao selecionar PIX
                }
              }
            }}
            className="space-y-4"
          >
            {["credit", "pix"].map((method) => (
              <div
                key={method}
                className={`border rounded-lg p-6 cursor-pointer ${
                  paymentMethod === method ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={method} id={method} />
                  <Label htmlFor={method}>
                    {method === "credit" ? "Cartão de Crédito" : "PIX"}
                  </Label>
                </div>

                {paymentMethod === "credit" && method === "credit" && (
                  <div className="mt-4 space-y-4">
                    <Input
                      placeholder="Número do Cartão"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <Input
                      placeholder="Nome no Cartão"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Validade (MM/AA)"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                      <Input
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>

          {paymentMethod === "pix" && pixQrCode && pixCode && (
            <div className="bg-[#FFF1E6] rounded-lg p-6 text-center mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Escaneie o QR Code para pagar
              </h3>
              <img
                src={`data:image/png;base64,${pixQrCode}`}
                alt="QR Code PIX"
                className="mx-auto w-48 h-48"
              />
              <button
              onClick={() => {
                console.log("🆕 Resetando PIX...");
                setPixID(null); // Apenas resetar o ID, sem chamar a função diretamente
              }}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Gerar Novo PIX
            </button>
              <p className="mt-2 text-sm text-gray-600">ID: {pixId}</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  navigator.clipboard.writeText(pixCode);
                  toast.success(
                    "Código PIX copiado para a área de transferência!",
                    {
                      style: {
                        background: "#FFC500",
                        color: "#ffff",
                      },
                      duration: 2000,
                    }
                  );
                }}
              >
                Copiar Código PIX
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                Após o pagamento, clique em "Confirmar Pagamento" abaixo
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium mt-6"
            onClick={
              paymentMethod === "pix"
                ? handlePixConfirmation
                : handleCardPayment
            }
            disabled={loading || (paymentMethod === "pix" && !pixId)}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {paymentMethod === "pix"
                  ? "Processando"
                  : "Verificando pagamento..."}
              </div>
            ) : paymentMethod === "pix" ? (
              "CONFIRMAR PAGAMENTO"
            ) : (
              "FINALIZAR PAGAMENTO"
            )}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
