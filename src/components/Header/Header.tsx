import { useState } from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  user: any;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-8 h-8 flex flex-col justify-center items-center group md:hidden"
      aria-label="Abrir menu"
    >
      <motion.span
        className="absolute w-6 h-0.5 bg-red-500"
        initial={false}
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -6 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute w-6 h-0.5 bg-red-500"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute w-6 h-0.5 bg-red-500"
        initial={false}
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 6 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
};

const Header = ({ user, isAuthenticated, onLogout }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-[#FBF8F4] border-b border-gray-100 py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" aria-label="Ir para página inicial">
            <img src="/logo_tedie.svg" alt="Logo Tedie" className="h-14" />
          </Link>
        </div>

        {/* Links de navegação - CENTRALIZADOS (somente desktop) */}
        <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {/* <Link 
            to="/creator" 
            className="text-red-500 hover:text-yellow-500 transition-colors"
            aria-label="Página de criadores"
          >
            CREATOR
          </Link> */}
          <Link 
            to="/sobre-nós" 
            className="text-red-500 hover:text-yellow-500 transition-colors"
            aria-label="Sobre nós"
          >
            SOBRE NÓS
          </Link>
        </nav>

        {/* Ícones sempre visíveis */}
        <div className="flex items-center space-x-4">
          <CartButton />
          
          {/* No mobile, apenas o menu hamburguer aparece */}
          <div className="md:hidden">
            <HamburgerButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>

          {/* No desktop, o usuário fica sempre visível */}
          <div className="hidden md:flex">
            <UserMenu user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
          </div>
        </div>
      </div>

      {/* Menu Mobile com animação */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 py-6 bg-[#FBF8F4] border-t border-gray-200"
          >

            {/* Usuário no menu mobile */}
            <div className="mt-4">
              <UserMenu user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
