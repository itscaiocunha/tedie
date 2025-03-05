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

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalCompra");
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    }
  }, []);

  const createPixPayment = async () => {
    try {
      const response = await fetch("https://api.mercadopago.com/v1/payments", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "Authorization": `Bearer YOUR_ACCESS_TOKEN`,
          "X-Idempotency-Key": `${Date.now()}`,
        },
        body: JSON.stringify({
          transaction_amount: total,
          payment_method_id: "pix",
          payer: {
            email: "caiocunha@w7agencia.com.br",
          },
        }),
      });

      const data = await response.json();
      if (data && data.point_of_interaction?.transaction_data?.qr_code) {
        setPixQrCode(data.point_of_interaction.transaction_data.qr_code_base64);
        setPixCode(data.point_of_interaction.transaction_data.qr_code);
      }
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
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
            <div className={`border rounded-lg p-6 cursor-pointer ${paymentMethod === "debit" ? "ring-2 ring-yellow-400" : ""}`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit">Cartão de Débito</Label>
              </div>
            </div>
            <div className={`border rounded-lg p-6 cursor-pointer ${paymentMethod === "credit" ? "ring-2 ring-yellow-400" : ""}`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit">Cartão de Crédito</Label>
              </div>
            </div>
            <div className={`border rounded-lg p-6 cursor-pointer ${paymentMethod === "pix" ? "ring-2 ring-yellow-400" : ""}`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix">PIX</Label>
              </div>
            </div>
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
