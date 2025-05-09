import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import InputMask from "react-input-mask";

type PaymentStatus = "pending" | "approved" | "rejected" | "cancelled";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit");
  const { user, logout, isAuthenticated } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);
  const [pixQrCode, setPixQrCode] = useState<string | null>(
    localStorage.getItem("pixQrCode")
  );
  const [pixCode, setPixCode] = useState<string | null>(
    localStorage.getItem("pixCode")
  );
  const [pixId, setPixID] = useState<string | null>(
    localStorage.getItem("pixId")
  );
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
  const [cardCpf, setCardCpf] = useState(localStorage.getItem("cardCpf") || "");
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("emailCheckout")
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  useEffect(() => {
    if (total > 0) {
      localStorage.setItem("totalCompra", total.toString());
    }
  }, [total]);

  useEffect(() => {
    if (total > 0) {
      localStorage.setItem("totalCompra", total.toString());
    }
  }, [total]);

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalCompra");
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailCheckout");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("paymentMethod", paymentMethod);
    localStorage.setItem("cardNumber", cardNumber);
    localStorage.setItem("cardName", cardName);
    localStorage.setItem("cardExpiry", cardExpiry);
    localStorage.setItem("cardCvv", cardCvv);
    localStorage.setItem("cardCpf", cardCpf);
  }, [paymentMethod, cardNumber, cardName, cardExpiry, cardCvv, cardCpf]);

  useEffect(() => {
    if (pixId === null && paymentMethod === "pix") {
      createPixPayment();
    }
  }, [pixId, paymentMethod]);

  useEffect(() => {
    if (pixId) {
      localStorage.setItem("pixId", pixId);
      handlePixConfirmation(pixId);
    }
  }, [pixId]);

  useEffect(() => {
    if (pixQrCode) localStorage.setItem("pixQrCode", pixQrCode);
  }, [pixQrCode]);

  useEffect(() => {
    if (pixCode) localStorage.setItem("pixCode", pixCode);
  }, [pixCode]);

  const createPixPayment = async () => {
    if (total <= 0) return;
    if (pixId) return;

    // setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          amount: total,
          email: email.toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro ao gerar PIX");

      setPixID(data.id);
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

  const checkPayment = async (id) => {
    const res = await fetch(`https://tedie-api.vercel.app/api/pix?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    const data = await res.json();
    return data.status_pagamento;
  };

  const handlePixConfirmation = async (id) => {
    const pixPaymentId = id || pixId;
    if (!pixPaymentId) {
      toast.error("ID do PIX não encontrado");
      return;
    }

    // setLoading(true);
    setError(null);
    let paymentApproved = false;
    let paymentCancelled = false;
    const toastId = "pix-status";
    let shouldContinueChecking = true; // Flag de controle
    let timeoutId = null; // Para armazenar o ID do timeout

    try {
      const maxAttempts = 360;
      const interval = 5000;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const status = await checkPayment(pixPaymentId);

        if (status === "approved") {
          toast.success("Pagamento aprovado! Finalizando pedido...", {
            id: toastId,
          });
          paymentApproved = true;

          const enderecoIdString = localStorage.getItem("enderecoId");
          const enderecoId = enderecoIdString
            ? parseInt(enderecoIdString, 10)
            : null;

          if (!enderecoId || isNaN(enderecoId)) {
            toast.error("Endereço inválido. Tente novamente.");
            return;
          }

          const orderResponse = await fetch(
            "https://tedie-api.vercel.app/api/pedido",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                usuario_id: Number(userId),
                total: total,
                endereco_id: enderecoId,
                status: "pago",
                itens: JSON.parse(
                  localStorage.getItem("itensCarrinho") || "[]"
                ),
              }),
            }
          );

          if (!orderResponse.ok) {
            const orderData = await orderResponse.json();
            throw new Error(orderData.message || "Erro ao registrar pedido.");
          }

          alert("Pagamento aprovado no PIX!");

          // Lógica para enviar mensagem whatsapp pelo webhook da zaia
          try {
            const itensCarrinho = JSON.parse(localStorage.getItem("itensCarrinho") || "[]");
            const endereco = JSON.parse(localStorage.getItem("enderecoEntrega") || "{}");
            const totalCompra = parseFloat(localStorage.getItem("totalCompra") || "0");
            const email = localStorage.getItem("emailCheckout") || "sem email";
          
            const nomeProduto = itensCarrinho.map(item => item.nome).join(" | ");
            const quantidadeProduto = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);
          
            const enderecoPedido = `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.cep}${endereco.complemento ? ` (${endereco.complemento})` : ""}`;
          
            await fetch("https://tedie-api.vercel.app/api/zaia-message", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                nomeProduto,
                quantidadeProduto,
                valorTotalPedido: totalCompra.toFixed(2),
                enderecoPedido,
                emailPedido: email,
                phoneNumber: "5519992944949",
              }),
            });
          
            console.log("Webhook Zaia disparado com sucesso.");
          } catch (error) {
            console.error("Erro ao enviar para o webhook da Zaia:", error);
          }

          toast.success("Fornecedor notificado com sucesso!");

          localStorage.removeItem("itensCarrinho");
          localStorage.removeItem("freteSelecionado");
          localStorage.removeItem("freteValor");
          localStorage.removeItem("desconto");
          localStorage.removeItem("totalCompra");
          localStorage.removeItem("cepDestino");
          localStorage.removeItem("cardNumber");
          localStorage.removeItem("cardName");
          localStorage.removeItem("cardExpiry");
          localStorage.removeItem("cardCvv");
          localStorage.removeItem("cardCpf");
          localStorage.removeItem("enderecoId");
          localStorage.removeItem("emailCheckout");
          localStorage.removeItem("paymentMethod");
          localStorage.removeItem("cupom");
          localStorage.removeItem("enderecoEntrega");
          localStorage.removeItem("frete");
          localStorage.removeItem("pixId");
          localStorage.removeItem("pixQrCode");
          localStorage.removeItem("pixCode");

          toast.dismiss(toastId);
          shouldContinueChecking = false; // Impede novas verificações
          navigate("/finalizado");
          return;
        }

        if (status === "cancelled") {
          paymentCancelled = true;
          shouldContinueChecking = false;
          break;
        }

        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, interval);
        });
      }

      if (!paymentApproved && !paymentCancelled) {
        throw new Error(
          "Pagamento não confirmado no período esperado, por favor tente novamente."
        );
      }
    } catch (error) {
      toast.error(error.message || "Erro na conexão com o servidor.", {
        id: toastId,
        duration: 3000,
      });
      setError(error.message);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId); // Limpa qualquer timeout pendente
      }
      setLoading(false);
    }
  };

  const isMockedCardData = () => {
    const sanitizedCardNumber = cardNumber.replace(/\D/g, "");

    return sanitizedCardNumber === "4509953566233704";
  };

  const isValidCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let check = 11 - (sum % 11);
    if (check >= 10) check = 0;
    if (check !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    check = 11 - (sum % 11);
    if (check >= 10) check = 0;

    return check === parseInt(cpf.charAt(10));
  };

  const handleCardPayment = async () => {
    if (total <= 0) return;
    setLoading(true);

    if (isMockedCardData()) {
      toast.error(
        "Dados de cartão inválidos. Por favor, utilize um cartão válido."
      );
      setLoading(false);
      return;
    }

    if (!isValidCPF(cardCpf)) {
      toast.error("CPF inválido. Verifique e tente novamente.");
      setLoading(false);
      return;
    }

    setError(null);

    try {
      const [month, year] = cardExpiry.split("/");

      console.log("Card Number:", cardNumber.replace(/\D/g, ""));
      console.log("Card Name:", cardName);
      console.log("Card Expiry:", cardExpiry);
      console.log("Month Expiry:", parseInt(month, 10));
      console.log("Year Expiry:", 2000 + parseInt(year, 10));
      console.log("Card CVV:", cardCvv);
      console.log("Card CPF:", cardCpf.replace(/\D/g, ""));
      console.log("Email:", email);

      if (!cardCpf || !cardCvv || !cardName || !cardNumber || !cardExpiry) {
        toast.error("Preencha todos os campos obrigatórios.");
        return;
      }

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
            // amount: total,
            amount: 1,
            email: email,
            card_number: cardNumber.replace(/\D/g, ""),
            expiration_month: parseInt(month, 10),
            expiration_year: 2000 + parseInt(year, 10),
            security_code: cardCvv,
            cardholder_name: cardName,
            installments: 1,
            identification: { type: "CPF", number: cardCpf.replace(/\D/g, "") },
          }),
        }
      );

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || "Erro ao processar pagamento.");
      }

      const enderecoIdString = localStorage.getItem("enderecoId");
      const enderecoId = enderecoIdString
        ? parseInt(enderecoIdString, 10)
        : null;

      if (!enderecoId || isNaN(enderecoId)) {
        toast.error("Endereço inválido. Tente novamente.");
        return;
      }

      if (pixId && pixQrCode && pixCode) {
        const pixCancelledResponse = await fetch(
          "https://tedie-api.vercel.app/api/pix",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "cancelled",
              idPagamento: pixId,
            }),
          }
        );

        const pixCancelledData = await pixCancelledResponse.json();
        if (!pixCancelledResponse.ok) {
          throw new Error(pixCancelledData.message || "Erro ao cancelar PIX.");
        }

        localStorage.removeItem("pixId");
        localStorage.removeItem("pixQrCode");
        localStorage.removeItem("pixCode");
      }

      const orderResponse = await fetch(
        "https://tedie-api.vercel.app/api/pedido",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_id: Number(userId),
            total: total,
            endereco_id: enderecoId,
            status: "pago",
            itens: JSON.parse(localStorage.getItem("itensCarrinho") || "[]"),
          }),
        }
      );

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(orderData.message || "Erro ao registrar pedido.");
      }

      alert("Pagamento aprovado no cartão!");

      localStorage.removeItem("itensCarrinho");
      localStorage.removeItem("freteSelecionado");
      localStorage.removeItem("freteValor");
      localStorage.removeItem("desconto");
      localStorage.removeItem("totalCompra");
      localStorage.removeItem("cepDestino");
      localStorage.removeItem("cardNumber");
      localStorage.removeItem("cardName");
      localStorage.removeItem("cardExpiry");
      localStorage.removeItem("cardCvv");
      localStorage.removeItem("cardCpf");
      localStorage.removeItem("enderecoId");
      localStorage.removeItem("emailCheckout");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("cupom");
      localStorage.removeItem("enderecoEntrega");
      localStorage.removeItem("frete");

      navigate("/finalizado");
    } catch (error) {
      setError(error.message || "Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3]">
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12 mt-32">
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-medium mb-8">MÉTODO DE PAGAMENTO</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
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
                      <InputMask
                        mask="9999 9999 9999 9999"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      >
                        {(inputProps) => (
                          <Input
                            {...inputProps}
                            placeholder="Número do Cartão"
                          />
                        )}
                      </InputMask>

                      <Input
                        placeholder="Nome no Cartão"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />

                      <InputMask
                        mask="999.999.999-99"
                        value={cardCpf}
                        onChange={(e) => setCardCpf(e.target.value)}
                      >
                        {(inputProps) => (
                          <Input {...inputProps} placeholder="CPF do Titular" />
                        )}
                      </InputMask>

                      <div className="flex space-x-4">
                        <InputMask
                          mask="99/99"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        >
                          {(inputProps) => (
                            <Input
                              {...inputProps}
                              placeholder="Validade (MM/AA)"
                            />
                          )}
                        </InputMask>

                        <Input
                          placeholder="CVV"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
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
              </div>
            )}

            {paymentMethod === "credit" && (
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium mt-6"
                onClick={handleCardPayment}
                disabled={loading}
              >
                {loading ? "PROCESSANDO PAGAMENTO" : "FINALIZAR PAGAMENTO"}
              </Button>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Payment;
