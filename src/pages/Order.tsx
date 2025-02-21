
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { ShoppingCart, User, Flame } from "lucide-react";

const OrderTracking = () => {
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-8">
            ACOMPANHAMENTO DO PEDIDO
          </h1>

          {/* Order Items */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center space-x-4">
              <img 
                src="" 
                alt="Biscoito"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">Biscoito Marilan Teens Snack Bouny 80g</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-red-500">R$ 4.25</span>
                  <span className="text-sm">Unidade: 1</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <img 
                src="https://source.unsplash.com/random/80x80?chocolate,drink" 
                alt="Toddynho"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">Toddynho Achocolatado - sabor chocolate 200ml</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-red-500">R$ 1.99</span>
                  <span className="text-sm">Unidade: 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <Link to="/detalhes-pedido" className="text-regular hover:text-red-500 underline">
              Detalhes do pedido
            </Link>
            <div className="mt-4 md:mt-0">
              <p className="text-sm">TOTAL: <span className="text-red-500 font-medium">R$8.23</span></p>
              <p className="text-sm">ID DO PEDIDO: <span className="text-yellow-400">1234567890</span></p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="relative">
            <div className="flex justify-between mb-4">
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-yellow-400 flex items-center justify-center mb-2">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">Pedido<br />Realizado</p>
              </div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-yellow-400 flex items-center justify-center mb-2">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">Pagamento<br />concluído</p>
              </div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                  <div className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">Pedido<br />Enviado</p>
              </div>
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                  <div className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">Pedido<br />Entregue</p>
              </div>
            </div>
            {/* Progress Line */}
            <div className="absolute top-6 left-0 w-full h-[2px] bg-yellow-100">
              <div className="w-1/2 h-full bg-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;