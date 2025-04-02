import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t-4 border-yellow-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Link to="/" aria-label="Página inicial">
          <img src="/logo_tedie.svg" alt="Logo Tedie" className="h-12" />
        </Link>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-500">
          <Link 
            to="/privacy" 
            className="hover:text-yellow-500 transition-colors"
            aria-label="Política de privacidade"
          >
            PRIVACIDADE
          </Link>
          <Link 
            to="/terms" 
            className="hover:text-yellow-500 transition-colors"
            aria-label="Termos e condições"
          >
            TERMOS E CONDIÇÕES
          </Link>
          <Link 
            to="/creator" 
            className="hover:text-yellow-500 transition-colors"
            aria-label="Programa de criadores"
          >
            PROGRAMA CREATORS
          </Link>
          <Link 
            to="/fornecedor/login" 
            className="hover:text-yellow-500 transition-colors"
            aria-label="Programa de criadores"
          >
            FORNECEDOR
          </Link>
          <p className="md:px-8 text-center md:text-left">
            © {new Date().getFullYear()} Tedie. Simples assim!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;