import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { User, ArrowRightFromLine } from "lucide-react";

interface HeaderProps {
  user: any;
  isAuthenticated: boolean;
  onLogout: () => void;
}

interface SupplierHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const SupplierHeader = ({ sidebarOpen, setSidebarOpen }: SupplierHeaderProps, { user, isAuthenticated, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
          
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Ir para página inicial">
              <img src="/logo_tedie.svg" alt="Logo Tedie" className="h-14" />
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <Search className="h-4 w-4 absolute top-2.5 left-2.5 text-gray-400" />
            <Input
              placeholder="Buscar pedidos..."
              className="pl-9 w-[200px] md:w-[300px] h-9 rounded-md"
            />
          </div> */}

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="p-2 flex items-center gap-2 hover:text-yellow-500"
              onClick={() => (isAuthenticated ? navigate("/fornecedor/dashboard") : navigate("/login"))}
              aria-label={isAuthenticated ? "Ver perfil" : "Fazer login"}
            >
              <User className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-700">
                {isAuthenticated ? `Olá, ${user?.nome}` : "Faça seu login"}
              </span>
            </Button>

            {isAuthenticated && (
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm text-gray-500 underline hover:text-red-500"
                onClick={onLogout}
                aria-label="Sair da conta"
              >
                <ArrowRightFromLine className="h-4 w-4 text-red-500" />
                Sair
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};