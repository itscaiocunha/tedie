
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Flame } from "lucide-react";

const Checkout = () => {
    const navigate = useNavigate();
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
                onClick={() => navigate("/checkout")}
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
            <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-black">2</div>
              <a href="/address" className="text-xs mt-2">ENTREGA</a>
            </div>
            <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-black">3</div>
              <a href="/payment" className="text-xs mt-2">PAGAMENTO</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-medium mb-8">RESUMO DO PEDIDO</h2>
          
          <div className="space-y-6">
            {/* Product Items */}
            <div className="space-y-4">
              {/* Produtos */}
            </div>

            {/* Shipping and Discount */}
            <div className="space-y-4 pt-6 border-t">
              <div>
                <label className="block text-sm mb-2 text-yellow-400">Calcular Frete</label>
                <Input 
                  type="text" 
                  placeholder="Digite seu CEP"
                  className="max-w-[200px]"
                />
                <p className="text-xs text-yellow-400 mt-1">Não sei meu frete</p>
              </div>

              <div>
                <label className="block text-sm mb-2 text-yellow-400">Desconto</label>
                <div className="flex gap-2">
                  <Input type="text" placeholder="Cupom de desconto" />
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
                    APLICAR
                  </Button>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-6 border-t">
              <span className="font-medium">TOTAL:</span>
              <span className="text-red-500 font-medium text-xl">R$ 8.23</span>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium" onClick={() => navigate("/address")}>
              CONCLUIR COMPRAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;