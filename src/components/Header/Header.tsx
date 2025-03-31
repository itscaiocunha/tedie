import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";

interface HeaderProps {
  user: any;
  isAuthenticated: boolean;
  onLogout: () => void;
  sticky?: boolean;
  showShadowOnScroll?: boolean;
}

const Header = ({ 
  user, 
  isAuthenticated, 
  onLogout, 
  sticky = true,
  showShadowOnScroll = true
}: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (showShadowOnScroll) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showShadowOnScroll]);

  return (
    <header className={`
      w-full bg-[#FBF8F4]/80 backdrop-blur-sm z-50 border-b border-gray-100 py-4
      ${sticky ? 'fixed top-0' : ''}
      ${showShadowOnScroll && scrolled ? 'shadow-md' : ''}
      transition-all duration-300
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" aria-label="Ir para página inicial" className="focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">
            <img 
              src="/logo_tedie.svg" 
              alt="Logo Tedie" 
              className="h-14 transition-transform hover:scale-105"
              loading="eager"
            />
          </Link>
        </div>
        
        {/* Navegação principal */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/creator" 
            className="text-red-500 hover:text-yellow-500 transition-colors px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Página de criadores"
          >
            CREATOR
          </Link>
          <Link 
            to="/about" 
            className="text-red-500 hover:text-yellow-500 transition-colors px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Sobre nós"
          >
            SOBRE NÓS
          </Link>
        </nav>
        
        {/* Ícones de ação */}
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