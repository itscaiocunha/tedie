import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("debit");

  // Mercado Pago
  useEffect(() => {
    const initMercadoPago = async () => {
      if (paymentMethod === "credit" || paymentMethod === "debit") {
        const mp = new window.MercadoPago("YOUR_PUBLIC_KEY", {
          locale: "pt-BR"
        });

        const bricksBuilder = mp.bricks();
        const settings = {
          initialization: {
            amount: 10000,
            preferenceId: "<PREFERENCE_ID>", // Substitua pelo seu ID de preferência
            payer: {
              firstName: "",
              lastName: "",
              email: "",
            },
          },
          customization: {
            visual: {
              style: {
                theme: "default",
              },
            },
            paymentMethods: {
              creditCard: "all",
              debitCard: "all",
              ticket: "all",
              bankTransfer: "all",
              atm: "all",
              maxInstallments: 1,
            },
          },
          callbacks: {
            onReady: () => {
              console.log("Payment Brick Ready");
            },
            onSubmit: ({ selectedPaymentMethod, formData }) => {
              return new Promise((resolve, reject) => {
                fetch("/process_payment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                })
                  .then((response) => response.json())
                  .then((response) => {
                    console.log("Payment Response:", response);
                    resolve();
                  })
                  .catch((error) => {
                    console.error("Payment Error:", error);
                    reject();
                  });
              });
            },
            onError: (error) => {
              console.error("Payment Brick Error:", error);
            },
          },
        };

        // Renderizando o Payment Brick
        window.paymentBrickController = await bricksBuilder.create(
          "payment",
          "paymentBrick_container",
          settings
        );
      }
    };

    initMercadoPago();
  }, [paymentMethod]);

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-medium mb-8">MÉTODO DE PAGAMENTO</h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Methods - Left Side */}
            <div className="lg:w-1/3">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className={`bg-[#FFF1E6] border rounded-lg p-6 cursor-pointer ${paymentMethod === "debit" ? "ring-2 ring-yellow-400" : ""}`}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit">Cartões de Débito</Label>
                  </div>
                </div>

                <div className={`bg-[#FFF1E6] border rounded-lg p-6 cursor-pointer ${paymentMethod === "credit" ? "ring-2 ring-yellow-400" : ""}`}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit">Cartões de Crédito</Label>
                  </div>
                </div>

                <div className={`bg-[#FFF1E6] border rounded-lg p-6 cursor-pointer ${paymentMethod === "pix" ? "ring-2 ring-yellow-400" : ""}`}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix">PIX</Label>
                  </div>
                </div>

                <div className={`bg-[#FFF1E6] border rounded-lg p-6 cursor-pointer ${paymentMethod === "boleto" ? "ring-2 ring-yellow-400" : ""}`}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto">Boleto</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Details - Right Side */}
            <div className="lg:w-2/3 space-y-6">
              {/* Mercado Pago Payment Brick */}
              {(paymentMethod === "credit" || paymentMethod === "debit") && (
                <div className="bg-[#FFF1E6] rounded-lg p-6">
                  <div id="paymentBrick_container"></div>
                </div>
              )}

              {/* PIX Information */}
              {paymentMethod === "pix" && (
                <div className="bg-[#FFF1E6] rounded-lg p-6">
                  <p className="text-sm text-gray-600">
                    Após finalizar a compra, você receberá um QR Code para realizar o pagamento via PIX.
                  </p>
                </div>
              )}

              {/* Boleto Information */}
              {paymentMethod === "boleto" && (
                <div className="bg-[#FFF1E6] rounded-lg p-6">
                  <p className="text-sm text-gray-600">
                    O boleto será gerado após a finalização da compra e poderá ser pago em qualquer banco ou casa lotérica.
                  </p>
                </div>
              )}

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium" onClick={() => window.location.href = "/finally"}>
                FINALIZAR PAGAMENTO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
