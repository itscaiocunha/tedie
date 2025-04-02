import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Package, CreditCard, LogOut } from "lucide-react";
import UserProfileInfo from "@/components/user/UserProfileInfo";
import UserProfileOrders from "@/components/user/UserProfileOrders";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col"> {/* Adicionei flex flex-col aqui */}
      {/* Header */}
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

      {/* Main Content - Adicionei flex-grow para ocupar o espaço disponível */}
      <div className="max-w-7xl mx-auto px-4 py-12 mt-20 flex-grow w-full"> {/* Adicionei mt-20 para compensar o header fixo e flex-grow */}
        <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-[#FFF1E6] border-0">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    className={`justify-start ${activeTab === "info" ? "bg-white text-red-500" : ""}`}
                    onClick={() => setActiveTab("info")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Meus Dados
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`justify-start ${activeTab === "orders" ? "bg-white text-red-500" : ""}`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Meus Pedidos
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <Card className="bg-[#FFF1E6] border-0">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start mb-6">
                    <TabsTrigger 
                      value="info" 
                      className={`pb-2 ${activeTab === "info" ? "border-b-2 border-red-500 text-red-500" : ""}`}
                    >
                      Meus Dados
                    </TabsTrigger>
                    <TabsTrigger 
                      value="orders" 
                      className={`pb-2 ${activeTab === "orders" ? "border-b-2 border-red-500 text-red-500" : ""}`}
                    >
                      Meus Pedidos
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="info">
                    <UserProfileInfo />
                  </TabsContent>
                  <TabsContent value="orders">
                    <UserProfileOrders />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer - Removi a margem superior e deixei apenas o footer */}
      <footer className="py-8 px-4 border-t-4 border-yellow-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <img src="/logo_tedie.svg" alt="Logo" className="h-12" />
          <div className="flex space-x-8 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-yellow-500 transition-colors">PRIVACIDADE</a>
            <a href="/terms" className="hover:text-yellow-500 transition-colors">TERMOS E CONDIÇÕES</a>
            <a href="/creators" className="hover:text-yellow-500 transition-colors">PROGRAMA CREATORS</a>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Tedie. Simples assim!</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;