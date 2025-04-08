import React, { useState } from "react";
import {
  Sparkles,
  Rocket,
  TrendingUp,
  ShoppingBag,
  Users,
  Zap,
  ChevronRight,
  CheckCircle,
  Star,
  Instagram,
} from "lucide-react";

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would typically send the email to your backend
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F4] text-black">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-[#FBF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center mb-4">
                <img src="public/logo_tedie.svg" alt="" />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-black">
                Transforme sua{" "}
                <span className="text-[#FFC600]">influência</span> em{" "}
                <span className="text-[#D70D0F]">renda</span>
              </h1>
              <p className="text-xl mb-8 text-black">
                Junte-se ao Tedie como Creator e use nossa tecnologia de IA para
                monetizar seu conteúdo de forma inovadora.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#apply"
                  className="bg-[#D70D0F] text-white font-bold py-3 px-8 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                >
                  Quero ser Creator
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#benefits"
                  className="bg-transparent border-2 border-[#FFC600] text-[#FFC600] font-bold py-3 px-8 rounded-full flex items-center justify-center hover:bg-[#FFC600] hover:text-black transition-all"
                >
                  Saiba mais
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-[#FFC600] rounded-lg blur opacity-75 animate-pulse"></div>
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="Creator com IA"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFC600] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#D70D0F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#FFC600] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <p className="text-4xl font-bold text-[#FFC600]">100K+</p>
              <p className="text-gray-300 mt-2">Usuários Ativos</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-[#FFC600]">R$5M+</p>
              <p className="text-gray-300 mt-2">Pagos aos Creators</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-[#FFC600]">500+</p>
              <p className="text-gray-300 mt-2">Creators Ativos</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-[#FFC600]">24/7</p>
              <p className="text-gray-300 mt-2">Suporte Exclusivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-[#FBF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Por que se tornar um Creator do Tedie?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Nossa plataforma de e-commerce potencializada por IA oferece
              benefícios exclusivos para influenciadores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#D70D0F]">
              <div className="bg-[#D70D0F] w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Tecnologia de IA Exclusiva
              </h3>
              <p className="text-gray-700">
                Acesse nossa tecnologia de IA que personaliza recomendações de
                produtos com base no seu público e estilo.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#FFC600]">
              <div className="bg-[#FFC600] w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Comissões Diferenciadas
              </h3>
              <p className="text-gray-700">
                Ganhe até X% em cada venda realizada através do seu perfil, com
                pagamentos rápidos e transparentes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#D70D0F]">
              <div className="bg-[#D70D0F] w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Produtos Variados
              </h3>
              <p className="text-gray-700">
                Uma grande quantodade de produtos dentro do Tedie.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#FFC600]">
              <div className="bg-[#FFC600] w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Comunidade Exclusiva
              </h3>
              <p className="text-gray-700">
                Faça parte de uma rede de influenciadores e participe de eventos
                exclusivos e oportunidades de colaboração.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#D70D0F]">
              <div className="bg-[#D70D0F] w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Ferramentas de Análise
              </h3>
              <p className="text-gray-700">
                Monitore seu desempenho em tempo real com dashboards intuitivos
                e relatórios detalhados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Três passos simples para começar a monetizar sua influência com o
              Tedie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-filter backdrop-blur-lg h-full">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#FFC600] flex items-center justify-center text-xl font-bold text-black">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-4">Inscreva-se</h3>
                <p className="text-gray-300">
                  Preencha o formulário de inscrição e nossa equipe analisará
                  seu perfil em até 48 horas.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-filter backdrop-blur-lg h-full">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#D70D0F] flex items-center justify-center text-xl font-bold text-white">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-4">Personalize</h3>
                <p className="text-gray-300">
                  Escolha seus produtos e grave um vídeo.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-filter backdrop-blur-lg h-full">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#FFC600] flex items-center justify-center text-xl font-bold text-black">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-4">Monetize</h3>
                <p className="text-gray-300">
                  Compartilhe seus videos com seus seguidores e comece a ganhar
                  comissões em cada venda realizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-16 px-4 bg-[linear-gradient(180deg,#FFC601_50%,#FBF8F4_50%)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-black">Conheça alguns dos nossos Creators</h2>

          {(() => {
            const creators = [
              { src: "https://w7startup.com.br/video/creator1.mp4", itens: 2 },
              { src: "https://w7startup.com.br/video/creator2.mp4", itens: [9897, 1140, 10122] },
              { src: "https://w7startup.com.br/video/creator3.mp4", itens: 330 },
            ];

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {creators.map((creator, index) => (
                  <div key={index} className="space-y-4">
                    <div className="relative aspect-[9/16] bg-gray-100 rounded-[20px] overflow-hidden w-full border-4 border-white">
                      <video
                        src={creator.src}
                        className="object-cover w-full h-full"
                        controls
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-20 bg-[#FFC601]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FBF8F4] rounded-xl p-10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-black">
                  Pronto para transformar sua influência em negócio?
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                  Junte-se a centenas de creators que já estão monetizando seu
                  conteúdo com o Tedie. Vagas limitadas!
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#D70D0F] mr-2" />
                    <span className="text-black">Inscrição gratuita</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#D70D0F] mr-2" />
                    <span className="text-black">Sem mensalidades</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#D70D0F] mr-2" />
                    <span className="text-black">Comissões de até X%</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#D70D0F] mr-2" />
                    <span className="text-black">Suporte exclusivo</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-32">
                  <a href="https://www.instagram.com/hello.juliabr/" className="text-[#D70D0F] hover:text-[#FFC600]">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#FBF8F4] rounded-xl p-8 shadow-lg border-t-4 border-[#FFC600]"
                >
                  <h3 className="text-2xl font-bold mb-6 text-black">
                    Inscreva-se como Creator
                  </h3>

                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-black"
                    >
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-[#FBF8F4] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D70D0F] text-black"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-black"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-[#FBF8F4] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D70D0F] text-black"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="social"
                      className="block text-sm font-medium mb-2 text-black"
                    >
                      Perfil social principal
                    </label>
                    <input
                      type="text"
                      id="social"
                      className="w-full px-4 py-3 bg-[#FBF8F4] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D70D0F] text-black"
                      placeholder="@seuperfil"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="followers"
                      className="block text-sm font-medium mb-2 text-black"
                    >
                      Número de seguidores
                    </label>
                    <select
                      id="followers"
                      className="w-full px-4 py-3 bg-[#FBF8F4] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D70D0F] text-black"
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="1k-10k">1K - 10K</option>
                      <option value="10k-50k">10K - 50K</option>
                      <option value="50k-100k">50K - 100K</option>
                      <option value="100k-500k">100K - 500K</option>
                      <option value="500k+">Mais de 500K</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D70D0F] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center hover:bg-[#FFC600] hover:text-black transition-all shadow-lg"
                  >
                    {submitted
                      ? "Enviado com sucesso!"
                      : "Quero ser Creator Tedie"}
                    {!submitted && <ChevronRight className="ml-2 h-5 w-5" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

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
}

export default App;
