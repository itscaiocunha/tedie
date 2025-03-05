import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("debit");
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalCompra");
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    }
  }, []);

  const createPixPayment = async () => {
    if (total <= 0) return;

    setLoading(true);
    try {
      const response = await fetch("https://tedie-api.vercel.app/api/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          email: "caiocunha@w7agencia.com.br"
        }),
      });

      const data = await response.json();
      if (data.qr_code) {
        setPixQrCode(data.qr_code_base64);
        setPixCode(data.qr_code);
      } else {
        console.error("Erro ao processar pagamento:", data);
      }
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
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
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-medium mb-8">MÉTODO DE PAGAMENTO</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            {["debit", "credit", "pix"].map((method) => (
              <div key={method} className={`border rounded-lg p-6 cursor-pointer ${paymentMethod === method ? "ring-2 ring-yellow-400" : ""}`}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={method} id={method} />
                  <Label htmlFor={method}>{method === "debit" ? "Cartão de Débito" : method === "credit" ? "Cartão de Crédito" : "PIX"}</Label>
                </div>
              </div>
            ))}
          </RadioGroup>

          {paymentMethod === "pix" && pixQrCode && pixCode && (
            <div className="bg-[#FFF1E6] rounded-lg p-6 text-center mt-6">
              <h3 className="text-lg font-semibold mb-4">Escaneie o QR Code para pagar</h3>
              <img src={`data:image/png;base64,${pixQrCode}`} alt="QR Code PIX" className="mx-auto w-48 h-48" />
              <p className="text-sm text-gray-600 mt-4">Ou copie o código abaixo:</p>
              <Input value={pixCode} readOnly className="text-center" />
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => navigator.clipboard.writeText(pixCode)}
              >
                Copiar Código PIX
              </Button>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <span className="font-medium">TOTAL:</span>
            <span className="text-red-500 font-medium text-xl">R$ {total.toFixed(2)}</span>
          </div>

          <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium mt-6">
            FINALIZAR PAGAMENTO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
