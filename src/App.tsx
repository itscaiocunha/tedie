import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Creator from "./pages/Creator";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Finally from "./pages/Finally";
import ProductDetails from "./pages/Produto";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import NewPass from "./pages/NewPass";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" richColors /> {/* Usando apenas o Sonner */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/esqueceu-senha" element={<Forget />} />
        <Route path="/nova-senha" element={<NewPass />} />
        <Route path="/sobre-nos" element={<About />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pagamento" element={<Payment />} />
        <Route path="/finalizado" element={<Finally />} />
        <Route path="/produto/:id" element={<ProductDetails />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
