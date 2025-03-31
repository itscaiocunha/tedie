import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";

interface HeaderProps {
  user: any;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header = ({ user, isAuthenticated, onLogout }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full bg-[#FBF8F4] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
        <div className="flex-shrink-0">
          <Link to="/" aria-label="Ir para página inicial">
            <img src="/logo_tedie.svg" alt="Logo Tedie" className="h-14" />
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/creator" 
            className="text-red-500 hover:text-yellow-500 transition-colors"
            aria-label="Página de criadores"
          >
            CREATOR
          </Link>
          <Link 
            to="/about" 
            className="text-red-500 hover:text-yellow-500 transition-colors"
            aria-label="Sobre nós"
          >
            SOBRE NÓS
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <CartButton />
          <UserMenu 
            user={user} 
            isAuthenticated={isAuthenticated} 
            onLogout={onLogout} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;