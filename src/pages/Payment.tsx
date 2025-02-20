
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, User, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("debit");

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <header className="top-0 w-full bg-[#FFF8F3] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/products" className="text-red-500 hover:text-yellow-500 transition-colors">PRODUTOS</a>
            <a href="/brands" className="text-red-500 hover:text-yellow-500 transition-colors">MARCAS</a>
            <a href="/about" className="text-red-500 hover:text-yellow-500 transition-colors">SOBRE NÓS</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:text-yellow-500 transition-colors"
                onClick={() => window.location.href = "/checkout"}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            <button 
              className="p-2 hover:text-yellow-500 transition-colors"
              onClick={() => window.location.href = "/login"}
            >
              <User className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="py-8 bg-[#FFF8F3] border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm text-black">1</div>
              <a href="/checkout" className="text-xs mt-2">LOGIN</a>
            </div>
            <div className="flex-1 h-[2px] bg-yellow-400 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm text-black">2</div>
              <a href="/address" className="text-xs mt-2">ENTREGA</a>
            </div>
            <div className="flex-1 h-[2px] bg-yellow-400 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm text-black">3</div>
              <a href="/payment" className="text-xs mt-2">PAGAMENTO</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium mb-8">MÉTODO DE PAGAMENTO</h2>
          </div>
          
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
              {/* Credit/Debit Card Form */}
              {(paymentMethod === "credit" || paymentMethod === "debit") && (
                <div className="bg-[#FFF1E6] rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm text-yellow-400 mb-1">NÚMERO DO CARTÃO</label>
                    <Input type="text" className="bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-yellow-400 mb-1">NOME DO TITULAR</label>
                    <Input type="text" className="bg-white " />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-yellow-400 mb-1">VALIDADE</label>
                      <Input type="text" placeholder="MM/AA" className="bg-white " />
                    </div>
                    <div>
                      <label className="block text-sm text-yellow-400 mb-1">CVV</label>
                      <Input type="text" maxLength={3} className="bg-white " />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="save-card" />
                    <label htmlFor="save-card" className="text-sm">
                      GUARDAR INFORMAÇÕES PARA COMPRAS FUTURAS
                    </label>
                  </div>
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

              {/* Order Summary */}
              <div className="bg-[#FFF1E6] rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">TOTAL:</span>
                  <span className="text-red-500 font-medium text-xl">R$ 8.23</span>
                </div>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium"  onClick={() => window.location.href = "/finally"}>
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