import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Package, CreditCard, LogOut } from "lucide-react";
import UserProfileInfo from "@/components/user/UserProfileInfo";
import UserProfileOrders from "@/components/user/UserProfileOrders";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"; // Corrigido: importação sem chaves

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col">
      {/* Header */}
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 mt-20 flex-grow w-full">
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

      <Footer />
    </div>
  );
};

export default UserProfile;