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
    <header className="fixed top-0 w-full bg-[#FBF8F4] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" aria-label="Ir para página inicial">
            <img src="/logo_tedie.svg" alt="Logo Tedie" className="h-14" />
          </Link>
        </div>

        {/* Ícone do carrinho SEMPRE visível */}
        <CartButton />

        {/* Botão menu mobile */}
        <HamburgerButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />

        {/* Ações desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <UserMenu user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
        </div>
      </div>

      {/* Ações mobile com animação */}
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
            <UserMenu user={user} isAuthenticated={isAuthenticated} onLogout={onLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
