import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CarrinhoProvider } from "./context/CarrinhoContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </BrowserRouter>
);
