import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Creator from "./pages/Creator";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Finally from "./pages/Finally";
import Order from "./pages/Order";
import ProductDetails from "./pages/Produto";
import About from "./pages/About";

import LoginFornecedor from "./pages/fornecedor/Login"
import Dashboard from "./pages/fornecedor/Dashboard";
import Produtos from "./pages/fornecedor/Produtos";
import Pedido from "./pages/fornecedor/Pedidos";
import Deliveries from "./pages/fornecedor/Entrega";
import Relatorio from "./pages/fornecedor/Relatorio";
import Configuracao from "./pages/fornecedor/Configuracao";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes> {/* Removido o BrowserRouter */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/finally" element={<Finally />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/order" element={<Order />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        <Route path="fornecedor/login" element={<LoginFornecedor />} />
        <Route path="fornecedor/dashboard" element={<Dashboard />} />
        <Route path="fornecedor/produtos" element={<Produtos />} />
        <Route path="fornecedor/pedidos" element={<Pedido />} />
        <Route path="fornecedor/entrega" element={<Deliveries />} />
        <Route path="fornecedor/relatorio" element={<Relatorio />} />
        <Route path="fornecedor/configuracao" element={<Configuracao />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
