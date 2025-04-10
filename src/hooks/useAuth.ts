import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const updateUser = async (data: {
    id: number;
    nome?: string;
    telefone?: string;
    senhaAtual?: string;
    novaSenha?: string;
  }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar usuário');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://tedie-api.vercel.app/api/perfil", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar perfil");
      }

      if (data.status === "success" && data.user) {
        setUser(data.user);
      } else {
        throw new Error("Resposta inválida da API");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://tedie-api.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      if (data.status === "success" && data.token) {
        localStorage.setItem("token", data.token);
        await fetchUserData();
      } else {
        throw new Error("Resposta inválida da API");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchUserData]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { 
    user, 
    loading, 
    error, 
    isAuthenticated, 
    login, 
    logout, 
    fetchUserData,
    updateUser 
  };
};

export default useAuth;