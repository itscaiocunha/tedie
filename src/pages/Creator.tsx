const BrandCard = ({ logo, background }: { logo: string; background: string }) => (
  <div className={`aspect-square rounded-2xl ${background} flex items-center justify-center p-8`}>
    <img src={logo} alt="Brand logo" className="w-full h-auto" />
  </div>
);

const Creator = () => {
  const brands = [
    { logo: "/logos/logo_ico.svg", background: "bg-[#FB6F6F]" },
    { logo: "/logos/logo_estrela.svg", background: "bg-[#FFB652]" },
    { logo: "/logos/logo_help.svg", background: "bg-[#FFB652]" },
    { logo: "/logos/logo_artervas.svg", background: "bg-[#FB6F6F]" },
    { logo: "/logos/logo_agro.svg", background: "bg-[#FFB652]" },
    { logo: "/logos/logo_drogaria.svg", background: "bg-[#FB6F6F]" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#FBF8F4] backdrop-blur-sm z-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo_tedie.svg" alt="Logo" className="h-14" />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/creator" className="text-red-500 hover:text-yellow-500 transition-colors">CREATOR</a>
            <a href="/about" className="text-red-500 hover:text-yellow-500 transition-colors">SOBRE NÓS</a>
          </nav>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FBF8F4]">
        <h1 className="text-6xl font-bold text-yellow-400 mb-16">MARCAS</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={index} {...brand} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4 border-yellow-200">
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

export default Creator;
