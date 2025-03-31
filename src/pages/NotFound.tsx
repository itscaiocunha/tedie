import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF8F4] p-6">
      <div className="text-center max-w-md">
        <img 
          src="/image/notfound.png" 
          alt="Teddie not found" 
          className="mx-auto w-64 h-auto mb-6 object-contain"
        />
        <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-lg text-gray-700 mb-4">Oops! Essa página ainda não existe.</p>
        <a 
          href="/" 
          className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition-all"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;