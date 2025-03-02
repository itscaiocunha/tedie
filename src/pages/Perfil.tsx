import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // ✅ Certifique-se de que o token está sendo lido corretamente

    if (!token) {
      console.warn("Token não encontrado. Redirecionando para login...");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      console.log("Iniciando requisição para API...");

      try {
        const response = await fetch("https://tedie-api.vercel.app/api/perfil", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Resposta da API:", data);

        if (data.status === "success" && data.user) {
          setUser(data.user); // ✅ Acessando corretamente o usuário
        } else {
          console.error("Erro ao buscar perfil:", data.message || "Resposta inválida da API");
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao servidor:", error);
      }
    };

    fetchUserData();
  }, []);

  return user ? (
    <div>
      <h1>Bem-vindo, {user.nome}!</h1>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.telefone}</p>
    </div>
  ) : (
    <p>Carregando...</p>
  );
};

export default Perfil;
