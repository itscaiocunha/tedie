import { User, ArrowRightFromLine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface UserMenuProps {
  user: any;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const UserMenu = ({ user, isAuthenticated, onLogout }: UserMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="p-2 flex items-center gap-2 hover:text-yellow-500"
        onClick={() => (isAuthenticated ? navigate("/perfil") : navigate("/login"))}
        aria-label={isAuthenticated ? "Ver perfil" : "Fazer login"}
      >
        <User className="h-5 w-5 text-yellow-400" />
        <span className="text-sm text-white hover:text-red-500">
          {isAuthenticated ? `Olá, ${user?.nome}` : "Faça seu login"}
        </span>
      </Button>

      {isAuthenticated && (
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-sm text-white underline hover:text-red-500"
          onClick={onLogout}
          aria-label="Sair da conta"
        >
          <ArrowRightFromLine className="h-4 w-4 text-yellow-400" />
          Sair
        </Button>
      )}
    </div>
  );
};

export default UserMenu;