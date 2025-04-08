import { ShoppingCart, User, ChevronRight } from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const Terms = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      {/* Header */}
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 px-4 bg-[#FBF8F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-yellow-500">Home</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Termos & Condições</span>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-gray">
          <h1 className="text-4xl font-bold mb-8">Termos & Condições</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
            <p>Bem-vindo ao [Nome da Loja]! Ao acessar ou usar nosso site, você concorda em cumprir e ser regido por estes Termos de Uso. Por favor, leia-os atentamente antes de utilizar nossos serviços.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Definições</h2>
            <ul className="list-disc pl-6">
              <li>"Site" refere-se ao website http://nomedosite.com.br</li>
              <li>"Nós", "nosso" ou "nos" refere-se a [Nome da Loja]</li>
              <li>"Você", "seu" ou "usuário" refere-se ao usuário ou visitante do nosso site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Uso do Site</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Elegibilidade</h3>
            <p>Você deve ter pelo menos 18 anos de idade ou ter permissão dos pais ou responsáveis legais para utilizar nosso site e serviços.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Conta de Usuário</h3>
            <p>Para fazer compras em nosso site, você pode ser obrigado a criar uma conta. Você é responsável por manter a confidencialidade das informações da sua conta e por todas as atividades que ocorrerem sob sua conta.</p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Precisão das Informações</h3>
            <p>Você concorda em fornecer informações precisas, atuais e completas durante o processo de registro e atualização de sua conta conforme necessário.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Pedidos e Pagamentos</h2>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Processo de Pedido</h3>
            <p>Todos os pedidos estão sujeitos à disponibilidade dos produtos. Reservamo-nos o direito de recusar qualquer pedido por qualquer motivo.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Preços e Pagamento</h3>
            <p>Todos os preços são apresentados em [moeda] e incluem impostos aplicáveis. Aceitamos os seguintes métodos de pagamento: cartões de crédito/débito e PIX.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Envio e Entrega</h2>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Métodos de Envio</h3>
            <p>Oferecemos vários métodos de envio, que podem variar de acordo com a localização. Os detalhes e custos de envio serão apresentados no momento da compra.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Prazos de Entrega</h3>
            <p>Os prazos de entrega são estimativas e podem variar. Não nos responsabilizamos por atrasos causados por eventos fora do nosso controle.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Devoluções e Reembolsos</h2>
            
            <h3 className="text-xl font-semibold mb-3">6.1 Política de Devolução</h3>
            <p>Aceitamos devoluções de produtos não utilizados e em sua embalagem original dentro de 30 dias após a entrega. Por favor, consulte nossa Política de Devolução para mais detalhes.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Processamento de Reembolsos</h3>
            <p>Os reembolsos serão processados no mesmo método de pagamento utilizado na compra original. O tempo para que o reembolso apareça na sua conta pode variar de acordo com o provedor de pagamento.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, gráficos, logotipos, imagens e software, é de propriedade de [Nome da Loja] ou de seus fornecedores e é protegido por leis de direitos autorais e outras leis de propriedade intelectual.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitação de Responsabilidade</h2>
            <p>Não garantimos que o site estará disponível de forma ininterrupta ou livre de erros. Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou incapacidade de uso do site.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contato</h2>
            <p>Se você tiver alguma dúvida ou preocupação sobre estes Termos de Uso, por favor, entre em contato conosco:</p>
            <ul className="list-none pl-6 mt-2">
              <li>Email: contato@nomedaloja.com</li>
              <li>Telefone: +55 11 1234-5678</li>
              <li>Endereço: Rua Exemplo, 123, São Paulo, SP, Brasil</li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Terms;