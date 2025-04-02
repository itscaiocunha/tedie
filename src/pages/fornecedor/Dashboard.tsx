import { useState } from "react";
import { SupplierHeader } from "@/components/Supplier/SupplierHeader";
import { SupplierOrdersTable } from "@/components/Supplier/SupplierOrdersTable";
import { SupplierOrderStats } from "@/components/Supplier/SupplierOrderStats";
import { SupplierSidebar } from "@/components/Supplier/SupplierSidebar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <SupplierSidebar open={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Bem vindo, $fornecedor$</h1>
            <p className="text-gray-600 mt-1">Visualize e gerencie os pedidos dos seus produtos</p>
          </div>
          
          <SupplierOrderStats />
          
          <div className="mt-8">
            <SupplierOrdersTable />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;