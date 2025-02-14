import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#FBF8F4] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/products" className="text-red-500 hover:text-yellow-500 transition-colors">PRODUTOS</a>
            <a href="/brands" className="text-red-500 hover:text-yellow-500 transition-colors">MARCAS</a>
            <a href="/about" className="text-red-500 hover:text-yellow-500 transition-colors">SOBRE NÓS</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-yellow-500 transition-colors">
              <ShoppingCart className="h-5 w-5 text-red-500" />
            </button>
            <button className="p-2 hover:text-yellow-500 transition-colors">
              <User className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Logo */}
      <div className="pt-32 pb-16 bg-[#FBF8F4]">
        <div className="max-w-[240px] mx-auto">
          <img src="/logo_about.svg" alt="Tedie" className="w-full" />
        </div>
      </div>

      {/* First Section */}
      <section className="bg-[#F6B009]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-red-600">tedie - Simples Assim!</h1>
              <p className="text-white text-lg leading-relaxed">
                Um marketplace inovador que utiliza a inteligência artificial para facilitar a busca de produtos para você. Nossa missão é
                simplificar a sua experiência de compra, oferecendo uma plataforma intuitiva e eficiente que conecta você aos melhores produtos
                disponíveis no mercado.
              </p>
            </div>
            <div className="relative h-[500px] w-full overflow-hidden">
              <img src="/Person1.png" alt="Person using phone" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="bg-[#F9826E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] w-full overflow-hidden order-2 md:order-1">
              <img src="/Person2.png" alt="Person eating" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="flex justify-end mb-8">
                <img src="/bear_logo.png" alt="Tedie Icon" className="h-45" />
              </div>
              <div className="text-white">
                <p className="text-lg mb-2">Estamos presentes nos <span className="font-bold">melhores momentos</span>,</p>
                <p className="text-lg leading-relaxed">em um almoço de família, em um jantar com os amigos, e até mesmo em um piquenique durante o café da manhã</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4 border-yellow-200 bg-[#FBF8F4]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <img src="/logo_tedie.svg" alt="Logo" className="h-12" />
          <div className="flex space-x-8 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-yellow-500 transition-colors">PRIVACIDADE</a>
            <a href="/terms" className="hover:text-yellow-500 transition-colors">TERMOS E CONDIÇÕES</a>
            <a href="/creators" className="hover:text-yellow-500 transition-colors">PROGRAMA CREATORS</a>
            <p className="px-28">© {new Date().getFullYear()} Tedie. Simples assim!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
