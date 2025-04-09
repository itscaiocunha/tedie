import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    email: "",
    senha: "",
    telefone: "",
  });
  const [error, setError] = useState("");
  const [ageError, setAgeError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Máscara para CPF (XXX.XXX.XXX-XX)
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Aplica máscara XXX.XXX.XXX-XX
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/^(\d{3})/, '$1.');
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/^(\d{3})(\d{3})/, '$1.$2.');
    } else if (value.length > 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
    }
    
    // Limita a 14 caracteres (XXX.XXX.XXX-XX)
    value = value.substring(0, 14);
    
    setFormData({
      ...formData,
      cpf: value
    });
  };

  // Máscara para telefone ((XX) XXXXX-XXXX)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Aplica máscara (XX) XXXXX-XXXX
    if (value.length > 0 && value.length <= 2) {
      value = `(${value}`;
    } else if (value.length > 2 && value.length <= 7) {
      value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else if (value.length > 7 && value.length <= 11) {
      value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    } else if (value.length > 11) {
      value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
    }
    
    // Limita a 15 caracteres ((XX) XXXXX-XXXX)
    value = value.substring(0, 15);
    
    setFormData({
      ...formData,
      telefone: value
    });
  };

  // Máscara para data de nascimento (DD/MM/YYYY)
  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2 && value.length <= 4) {
      value = value.replace(/^(\d{2})/, '$1/');
    } else if (value.length > 4) {
      value = value.replace(/^(\d{2})(\d{2})/, '$1/$2/');
    }
    
    value = value.substring(0, 10);
    
    setFormData({
      ...formData,
      data_nascimento: value
    });
    setAgeError("");
  };

  const isAdult = (birthDate) => {
    try {
      const [day, month, year] = birthDate.split('/').map(Number);
      
      if (!day || !month || !year || year.toString().length !== 4) {
        return false;
      }
      
      const birthDateObj = new Date(year, month - 1, day);
      const today = new Date();
      
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
      
      return age >= 18;
    } catch (error) {
      console.error("Erro ao validar data:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAgeError("");

    if (formData.data_nascimento && !isAdult(formData.data_nascimento)) {
      setAgeError("Você deve ter pelo menos 18 anos para se cadastrar.");
      return;
    }

    try {
      const response = await fetch("https://tedie-api.vercel.app/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cpf: formData.cpf.replace(/\D/g, ''), // Remove máscara antes de enviar
          telefone: formData.telefone.replace(/\D/g, '') // Remove máscara antes de enviar
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === "success" && data.data?.token) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userId", data.data.id);
          navigate("/");
        } else {
          navigate("/login");
        }
      } else {
        setError(data.message || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro no servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col items-center justify-center">
      <div className="p-8">
        <Link to="/">
          <img src="/logo_tedie.svg" alt="Tedie" className="h-12 md:h-16" />
        </Link>
      </div>

      <div className="flex flex-col items-center w-full max-w-md bg-[#FFF1E6] rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2">👋 Olá! Crie sua conta</h1>
          <p className="text-sm text-gray-600">MINHA CONTA</p>
        </div>

        <div className="flex justify-between mb-8 w-full">
          <Link 
            to="/login"
            className="pb-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            LOG IN
          </Link>
          <Link 
            to="/register"
            className="pb-2 text-red-500 border-b-2 border-red-500"
          >
            CADASTRO
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Input
            type="text"
            name="nome"
            placeholder="Nome completo"
            className="bg-white border-0"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="bg-white border-0"
            value={formData.cpf}
            onChange={handleCpfChange}
            maxLength={14}
            required
          />
          <div>
            <Input
              type="text"
              name="data_nascimento"
              placeholder="Data de Nascimento"
              className="bg-white border-0"
              value={formData.data_nascimento}
              onChange={handleDateChange}
              maxLength={10}
              required
            />
            {ageError && <p className="text-red-500 text-sm mt-1">{ageError}</p>}
          </div>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            className="bg-white border-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="telefone"
            placeholder="Telefone"
            className="bg-white border-0"
            value={formData.telefone}
            onChange={handlePhoneChange}
            maxLength={15}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              className="bg-white border-0 pr-10"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>

          <Button 
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
          >
            CADASTRAR
          </Button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm text-gray-500 hover:text-yellow-500 transition-colors underline"
            >
              Já possuo cadastro
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;