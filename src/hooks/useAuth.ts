import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

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

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { user, loading, error, isAuthenticated, logout, fetchUserData };
};

export default useAuth;