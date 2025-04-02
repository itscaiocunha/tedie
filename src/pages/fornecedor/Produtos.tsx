
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";

// Mock data para produtos
const products = [
  {
    id: "PROD-1001",
    name: "Camiseta Básica",
    category: "Vestuário",
    price: "R$ 49,90",
    stock: 125,
    status: "ativo"
  },
  {
    id: "PROD-1002",
    name: "Calça Jeans",
    category: "Vestuário",
    price: "R$ 129,90",
    stock: 87,
    status: "ativo"
  },
  {
    id: "PROD-1003",
    name: "Tênis Esportivo",
    category: "Calçados",
    price: "R$ 199,90",
    stock: 42,
    status: "ativo"
  },
  {
    id: "PROD-1004",
    name: "Moletom Inverno",
    category: "Vestuário",
    price: "R$ 89,90",
    stock: 56,
    status: "ativo"
  },
  {
    id: "PROD-1005",
    name: "Boné Ajustável",
    category: "Acessórios",
    price: "R$ 29,90",
    stock: 98,
    status: "baixo_estoque"
  },
  {
    id: "PROD-1006",
    name: "Relógio Esportivo",
    category: "Acessórios",
    price: "R$ 149,90",
    stock: 0,
    status: "esgotado"
  },
];

// Estilos para os badges de status
const statusStyles = {
  ativo: "bg-green-100 text-green-800",
  baixo_estoque: "bg-yellow-100 text-yellow-800",
  esgotado: "bg-red-100 text-red-800",
  inativo: "bg-gray-100 text-gray-800"
};

// Labels para os status
const statusLabels = {
  ativo: "Ativo",
  baixo_estoque: "Baixo Estoque",
  esgotado: "Esgotado",
  inativo: "Inativo"
};

const Produtos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <SupplierSidebar open={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Produtos</h1>
              <p className="text-gray-600 mt-1">Gerencie seu catálogo de produtos</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Produto
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-4 flex flex-col md:flex-row gap-4 border-b">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar produtos..." 
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
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge className={statusStyles[product.status as keyof typeof statusStyles]}>
                          {statusLabels[product.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-4 border-t">
              <div className="text-sm text-gray-500">
                Mostrando 6 de 24 produtos
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Produtos;