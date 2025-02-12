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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <img src="/image/ursinhos.png" alt="tedie" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Essa página ainda não existe</p>
        <a href="/" className="text-red-500 hover:text-red-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
