import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const About = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

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
                <p className="text-lg leading-relaxed">Em um almoço de família, em um jantar com os amigos, e até mesmo em um piquenique durante o café da manhã</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;