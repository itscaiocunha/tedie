import { ChevronRight } from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const Privacy = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      {/* Header mantido igual ao da página inicial */}
      <Header user={user} onLogout={logout} isAuthenticated={isAuthenticated} />

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 px-4 bg-[#FBF8F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-yellow-500">Home</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Política de Privacidade</span>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-gray">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
            <p>Na [Nome da Loja], a segurança dos seus dados é uma prioridade. Esta Política de Segurança descreve as medidas que adotamos para proteger suas informações pessoais e garantir uma experiência de compra segura.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Segurança de Dados</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Criptografia</h3>
            <p>Utilizamos a tecnologia SSL (Secure Socket Layer) para criptografar todas as informações pessoais transmitidas através do nosso site. Isso garante que seus dados, como informações de pagamento e detalhes pessoais, estejam protegidos contra acesso não autorizado.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Armazenamento Seguro</h3>
            <p>Armazenamos suas informações em servidores seguros e utilizamos firewalls para proteger nossos sistemas de acesso não autorizado. Apenas pessoal autorizado tem acesso às informações armazenadas e são obrigados a manter a confidencialidade das mesmas.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Segurança de Pagamento</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Provedores de Pagamento</h3>
            <p>Trabalhamos com provedores de pagamento confiáveis e reconhecidos que seguem rigorosos padrões de segurança (como PCI-DSS) para garantir que suas transações sejam processadas de forma segura.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Autenticação</h3>
            <p>Para aumentar a segurança, utilizamos autenticação multifator (MFA) para transações financeiras. Isso ajuda a garantir que somente você possa realizar compras usando suas informações de pagamento.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Proteção Contra Fraudes</h2>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Monitoramento</h3>
            <p>Implementamos sistemas de monitoramento para detectar e prevenir atividades fraudulentas. Monitoramos transações suspeitas e tomamos medidas imediatas para investigar e resolver possíveis fraudes.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Política de Fraude</h3>
            <p>Se detectarmos qualquer atividade fraudulenta associada à sua conta ou transações, entraremos em contato imediatamente para verificar a autenticidade das transações e tomar as medidas necessárias para proteger sua conta.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Privacidade</h2>
            <p>Nossa [Política de Privacidade] descreve como coletamos, usamos e protegemos suas informações pessoais. A privacidade e a segurança dos seus dados são integradas em todos os nossos processos.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Dicas de Segurança para Usuários</h2>
            
            <h3 className="text-xl font-semibold mb-3">6.1 Senhas Fortes</h3>
            <p>Recomendamos que você utilize senhas fortes e únicas para sua conta em nosso site. Evite usar a mesma senha em vários sites e altere sua senha regularmente.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Informações Pessoais</h3>
            <p>Nunca compartilhe suas informações pessoais, como senhas ou detalhes de pagamento, com terceiros. Nós nunca solicitaremos suas senhas por email ou telefone.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Verificação de Segurança</h3>
            <p>Certifique-se de que está acessando nosso site através de uma conexão segura (veja o ícone de cadeado no navegador) e verifique o endereço do site para garantir que você está realmente em nosso domínio oficial.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Relato de Problemas de Segurança</h2>
            
            <h3 className="text-xl font-semibold mb-3">7.1 Contato</h3>
            <p>Se você suspeitar de qualquer atividade suspeita ou detectar uma vulnerabilidade de segurança em nosso site, por favor, entre em contato conosco imediatamente:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email: seguranca@nomedaloja.com</li>
              <li>Telefone: +55 11 1234-5678</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Investigação</h3>
            <p>Levamos todas as questões de segurança a sério e investigaremos prontamente qualquer relato de atividade suspeita ou vulnerabilidade. Tomaremos as medidas necessárias para resolver qualquer problema e proteger nossos usuários.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Atualizações de Segurança</h2>
            
            <h3 className="text-xl font-semibold mb-3">8.1 Revisão Regular</h3>
            <p>Revisamos e atualizamos regularmente nossas práticas de segurança para garantir que estamos utilizando as tecnologias mais recentes e seguindo as melhores práticas do setor.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Notificações</h3>
            <p>Informaremos nossos usuários sobre quaisquer mudanças significativas em nossa Política de Segurança através do nosso site e, se necessário, através de outros meios de comunicação.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Conclusão</h2>
            <p>Estamos comprometidos em proteger suas informações e proporcionar uma experiência de compra segura. Se você tiver alguma dúvida sobre nossa Política de Segurança, não hesite em nos contatar.</p>
          </section>
        </div>
      </main>

      {/* Footer mantido igual ao da página inicial */}
      <Footer />
    </div>
  );
};

export default Privacy;