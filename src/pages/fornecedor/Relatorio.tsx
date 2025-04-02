
import { useState } from "react";
import { SupplierHeader } from "@/components/supplier/SupplierHeader";
import { SupplierSidebar } from "@/components/supplier/SupplierSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Download, Calendar, Filter } from "lucide-react";

// Mock data para gráficos
const salesData = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 5000 },
  { name: 'Abr', vendas: 4500 },
  { name: 'Mai', vendas: 6000 },
  { name: 'Jun', vendas: 5500 },
];

const categoryData = [
  { name: 'Vestuário', value: 35 },
  { name: 'Calçados', value: 25 },
  { name: 'Acessórios', value: 20 },
  { name: 'Eletrônicos', value: 15 },
  { name: 'Outros', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Relatorio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <SupplierSidebar open={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Relatórios</h1>
              <p className="text-gray-600 mt-1">Análise de desempenho e métricas</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Período
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 24.659,00</div>
                <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">346</div>
                <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% em relação ao mês anterior</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vendas mensais</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    vendas: {
                      label: "Vendas",
                      theme: {
                        light: "#f59e0b",
                        dark: "#f59e0b"
                      }
                    }
                  }}
                >
                  <BarChart data={salesData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="vendas" fill="#f59e0b" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vendas por categoria</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Principais produtos vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Vendidos</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead>Média/dia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>PROD-1001</TableCell>
                    <TableCell>Camiseta Básica</TableCell>
                    <TableCell>Vestuário</TableCell>
                    <TableCell>124</TableCell>
                    <TableCell>R$ 6.187,60</TableCell>
                    <TableCell>4.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PROD-1002</TableCell>
                    <TableCell>Calça Jeans</TableCell>
                    <TableCell>Vestuário</TableCell>
                    <TableCell>87</TableCell>
                    <TableCell>R$ 11.301,30</TableCell>
                    <TableCell>2.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PROD-1003</TableCell>
                    <TableCell>Tênis Esportivo</TableCell>
                    <TableCell>Calçados</TableCell>
                    <TableCell>65</TableCell>
                    <TableCell>R$ 12.993,50</TableCell>
                    <TableCell>2.2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

// Import the Table components from outside the file to prevent duplication
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

export default Relatorio;