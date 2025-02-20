
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Flame } from "lucide-react";

const Address = () => {
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
          <h2 className="text-2xl font-medium mb-8">ENDEREÇO</h2>
          
          <div className="space-y-6">
            {/* CEP Input */}
            <div>
              <label className="block text-sm mb-2">CEP</label>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Digite seu CEP"
                  className="max-w-[200px]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Address Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">RUA</label>
                <Input type="text" className="bg-white" />
              </div>

              <div>
                <label className="block text-sm mb-2">NÚMERO</label>
                <Input type="text" className="bg-white" />
              </div>

              <div>
                <label className="block text-sm mb-2">COMPLEMENTO</label>
                <Input type="text" className="bg-white " />
              </div>

              <div>
                <label className="block text-sm mb-2">BAIRRO</label>
                <Input type="text" className="bg-white " />
              </div>

              <div>
                <label className="block text-sm mb-2">CIDADE</label>
                <Input type="text" className="bg-white " />
              </div>

              <div>
                <label className="block text-sm mb-2">ESTADO</label>
                <Input type="text" className="bg-white " />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                SALVAR
              </Button>
            </div>

            {/* Saved Addresses */}
            <h3 className="text-xl font-medium  mb-6">ENDEREÇOS SALVOS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              <button className="bg-white rounded-lg p-4 flex items-center justify-center text-red-500 border-2 border-red-600">
                <Plus className="h-6 w-6" />
              </button>
            </div>

            {/* Delivery Options */}
            <div className="pt-8">
              <h3 className="text-xl font-medium  mb-6">FORMA DE ENTREGA</h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between bg-white rounded-lg p-4 cursor-pointer">
                  <div className="flex items-center">
                    <input type="radio" name="delivery" className="mr-3" defaultChecked />
                    <span>Expresso</span>
                  </div>
                  <div className="text-sm">
                    <p>Receba até dia 31 de julho</p>
                    <p className="text-red-500">R$2,99</p>
                  </div>
                </label>

                <label className="flex items-center justify-between bg-white rounded-lg p-4 cursor-pointer">
                  <div className="flex items-center">
                    <input type="radio" name="delivery" className="mr-3" />
                    <span>Econômico</span>
                  </div>
                  <div className="text-sm">
                    <p>Receba até dia 05 de agosto</p>
                    <p className="text-green-500">Grátis</p>
                  </div>
                </label>
              </div>
            </div>

            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-medium"
              onClick={() => window.location.href = '/payment'}
            >
              FINALIZAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;