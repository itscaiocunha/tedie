
import { useState } from "react";
import { Link } from "react-router-dom";
import { SupplierHeader } from "@/components/supplier/SupplierHeader";
import { SupplierSidebar } from "@/components/supplier/SupplierSidebar";
import { SupplierOrdersTable } from "@/components/supplier/SupplierOrdersTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const Pedidos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <SupplierSidebar open={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Pedidos</h1>
            <p className="text-gray-600 mt-1">Gerencie os pedidos dos clientes</p>
          </div>
          
          <div className="grid gap-4 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">152</div>
                <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Novos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Nas últimas 24 horas</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Aguardando Envio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Pedidos a processar</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 127,50</div>
                <p className="text-xs text-muted-foreground">Valor médio por pedido</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 flex flex-col md:flex-row gap-4 border-b">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar por número de pedido, cliente..." 
                  className="pl-9"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
            
            <SupplierOrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pedidos;