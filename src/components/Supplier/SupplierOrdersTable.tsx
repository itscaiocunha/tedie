
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data para os pedidos
const orders = [
  {
    id: "9876",
    customer: "Maria Silva",
    date: "22/06/2023",
    product: "batatas Ico",
    total: "R$ 157,50",
    status: "entregue",
    items: 5
  },
  {
    id: "9875",
    customer: "João Santos",
    date: "22/06/2023",
    product: "batatas Ico",
    total: "R$ 89,90",
    status: "em_processamento",
    items: 2
  },
  {
    id: "9874",
    customer: "Ana Oliveira",
    date: "21/06/2023",
    product: "batatas Ico",
    total: "R$ 235,40",
    status: "enviado",
    items: 7
  },
  {
    id: "9873",
    customer: "Pedro Costa",
    date: "21/06/2023",
    product: "batatas Ico",
    total: "R$ 45,99",
    status: "pendente",
    items: 1
  },
  {
    id: "9872",
    customer: "Carla Mendes",
    date: "20/06/2023",
    product: "batatas Ico",
    total: "R$ 189,75",
    status: "entregue",
    items: 3
  },
];

const statusStyles = {
  pendente: "bg-yellow-100 text-yellow-800",
  em_processamento: "bg-blue-100 text-blue-800",
  enviado: "bg-purple-100 text-purple-800",
  entregue: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800"
};

const statusLabels = {
  pendente: "Pendente",
  em_processamento: "Em processamento",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado"
};

export const SupplierOrdersTable = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Pedidos Recentes</h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido #</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge className={statusStyles[order.status as keyof typeof statusStyles]}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};