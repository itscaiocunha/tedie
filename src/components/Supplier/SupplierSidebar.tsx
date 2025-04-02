
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  FileText, 
  Calendar,
  Settings
} from "lucide-react";

interface SupplierSidebarProps {
  open: boolean;
}

export const SupplierSidebar = ({ open }: SupplierSidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/fornecedor/Dashboard" },
    { icon: Package, name: "Produtos", path: "/fornecedor/Produtos" },
    { icon: ShoppingCart, name: "Pedidos", path: "/fornecedor/pedidos" },
    { icon: Truck, name: "Entregas", path: "/fornecedor/Entrega" },
    { icon: FileText, name: "Relatórios", path: "/fornecedor/Relatorio" },
    { icon: Settings, name: "Configurações", path: "/fornecedor/Configuracao" },
  ];

  return (
    <aside 
      className={`fixed mt-8 left-0 top-[65px] z-9 h-[calc(100vh-65px)] bg-white shadow-sm transition-all duration-300 ${
        open ? "w-64" : "w-0 -translate-x-full md:w-16 md:translate-x-0"
      }`}
    >
      <div className="flex h-full flex-col overflow-y-auto scrollbar-hide py-4">
        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
                    location.pathname === item.path ? "bg-gray-100 text-yellow-500" : "text-gray-600"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    location.pathname === item.path ? "text-yellow-500" : "text-gray-400"
                  }`} />
                  {open && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};