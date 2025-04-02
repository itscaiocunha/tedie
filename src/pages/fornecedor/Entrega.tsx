
import { useState } from "react";
import { SupplierHeader } from "@/components/supplier/SupplierHeader";
import { SupplierSidebar } from "@/components/supplier/SupplierSidebar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpDown, MapPin, Truck } from "lucide-react";

// Mock data para entregas
const deliveries = [
  {
    id: "DEL-5001",
    order: "ORD-9876",
    customer: "Maria Silva",
    address: "Rua das Flores, 123 - São Paulo, SP",
    date: "24/06/2023",
    status: "entregue"
  },
  {
    id: "DEL-5002",
    order: "ORD-9875",
    customer: "João Santos",
    address: "Av. Paulista, 1578 - São Paulo, SP",
    date: "25/06/2023",
    status: "em_transito"
  },
  {
    id: "DEL-5003",
    order: "ORD-9874",
    customer: "Ana Oliveira",
    address: "Rua Augusta, 890 - São Paulo, SP",
    date: "25/06/2023",
    status: "em_transito"
  },
  {
    id: "DEL-5004",
    order: "ORD-9873",
    customer: "Pedro Costa",
    address: "Av. Rebouças, 1200 - São Paulo, SP",
    date: "26/06/2023",
    status: "programado"
  },
  {
    id: "DEL-5005",
    order: "ORD-9872",
    customer: "Carla Mendes",
    address: "Rua Oscar Freire, 456 - São Paulo, SP",
    date: "23/06/2023",
    status: "entregue"
  }
];

// Estilos para os badges de status
const statusStyles = {
  entregue: "bg-green-100 text-green-800",
  em_transito: "bg-blue-100 text-blue-800",
  programado: "bg-purple-100 text-purple-800",
  cancelado: "bg-red-100 text-red-800"
};

// Labels para os status
const statusLabels = {
  entregue: "Entregue",
  em_transito: "Em Trânsito",
  programado: "Programado",
  cancelado: "Cancelado"
};

const Deliveries = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <SupplierSidebar open={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Entregas</h1>
            <p className="text-gray-600 mt-1">Acompanhe o status das entregas dos pedidos</p>
          </div>
          
          <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Entregas Hoje</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Em Trânsito</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Programadas</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 flex flex-col md:flex-row gap-4 border-b">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar por código, cliente..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>{delivery.order}</TableCell>
                      <TableCell>{delivery.customer}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={delivery.address}>
                        {delivery.address}
                      </TableCell>
                      <TableCell>{delivery.date}</TableCell>
                      <TableCell>
                        <Badge className={statusStyles[delivery.status as keyof typeof statusStyles]}>
                          {statusLabels[delivery.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-4 border-t">
              <div className="text-sm text-gray-500">
                Mostrando 5 de 35 entregas
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Deliveries;