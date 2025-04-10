import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import InputMask from 'react-input-mask';

const UserProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: ""
    }
  });
  const [passwordData, setPasswordData] = useState({
    senhaAtual: "",
    novaSenha: ""
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const API_URL = `https://tedie-api.vercel.app/api/usuario?id=${userId}`;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro na resposta da API");
        
        const data = await response.json();
        
        if (data.user && data.user.endereco) {
          setUserData({
            ...data.user,
            endereco: {
              cep: data.user.endereco.cep || "",
              logradouro: data.user.endereco.logradouro || "",
              numero: data.user.endereco.numero || "",
              complemento: data.user.endereco.complemento || "",
              bairro: data.user.endereco.bairro || "",
              cidade: data.user.endereco.cidade || "",
              estado: data.user.endereco.estado || "",
              pais: data.user.endereco.pais || ""
            }
          });
        } else {
          setUserData({
            ...data.user,
            endereco: {
              cep: data.user.cep || "",
              logradouro: data.user.logradouro || "",
              numero: data.user.numero || "",
              complemento: data.user.complemento || "",
              bairro: data.user.bairro || "",
              cidade: data.user.cidade || "",
              estado: data.user.estado || "",
              pais: data.user.pais || ""
            }
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        toast.error("Erro ao carregar dados do usuário");
      }
    };

    fetchUserData();
  }, []);

  const removeMask = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const handleEdit = () => setIsEditing(true);
  
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("ID do usuário não encontrado");

      const cpfSemMascara = removeMask(userData.cpf);
      const telefoneSemMascara = removeMask(userData.telefone);

      const response = await fetch("https://tedie-api.vercel.app/api/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(userId),
          nome: userData.nome,
          telefone: telefoneSemMascara,
          cpf: cpfSemMascara,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar perfil");
      }

      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error(error.message || "Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordEdit = () => setIsEditingPassword(true);
  
  const handlePasswordSave = async () => {
    if (!passwordData.senhaAtual || !passwordData.novaSenha) {
      toast.warning("Preencha ambos os campos de senha");
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("ID do usuário não encontrado");

      const response = await fetch("https://tedie-api.vercel.app/api/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(userId),
          senhaAtual: passwordData.senhaAtual,
          novaSenha: passwordData.novaSenha,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao alterar senha");
      }

      toast.success("Senha alterada com sucesso!");
      setIsEditingPassword(false);
      setPasswordData({ senhaAtual: "", novaSenha: "" });
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      toast.error(error.message || "Erro ao alterar senha");
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = () => {
    const { endereco } = userData;
    
    let addressParts = [];
    if (endereco.logradouro) addressParts.push(endereco.logradouro);
    if (endereco.numero) addressParts.push(endereco.numero);
    if (endereco.complemento) addressParts.push(endereco.complemento);
    
    const addressLine = addressParts.join(", ");
    
    let locationParts = [];
    if (endereco.bairro) locationParts.push(endereco.bairro);
    if (endereco.cidade) locationParts.push(endereco.cidade);
    if (endereco.estado) locationParts.push(endereco.estado);
    
    const locationLine = locationParts.join(" - ");
    
    return { 
      addressLine, 
      locationLine, 
      cep: endereco.cep,
      hasAddress: endereco.logradouro && endereco.cep
    };
  };

  const { addressLine, locationLine, cep, hasAddress } = formatAddress();

  if (!userData.nome) return <p>Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Informações Pessoais</h2>
        {!isEditing ? (
          <Button onClick={handleEdit} className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Editar
          </Button>
        ) : (
          <Button 
            onClick={handleSave} 
            className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              "Salvando..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="name">Nome completo</Label>
          <Input 
            id="name" 
            value={userData.nome} 
            onChange={(e) => setUserData({ ...userData, nome: e.target.value })} 
            className="bg-white" 
            disabled={!isEditing || isLoading} 
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={userData.email} className="bg-gray-100" disabled />
        </div>

        <div className="space-y-3">
          <Label htmlFor="phone">Telefone</Label>
          <InputMask
            mask="(99) 99999-9999"
            value={userData.telefone}
            onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
            disabled={!isEditing || isLoading}
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                id="phone"
                className="bg-white"
                placeholder="(00) 00000-0000"
              />
            )}
          </InputMask>
        </div>

        <div className="space-y-3">
          <Label htmlFor="cpf">CPF</Label>
          <InputMask
            mask="999.999.999-99"
            value={userData.cpf}
            onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
            disabled={!isEditing || isLoading}
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                id="cpf"
                className="bg-white"
                placeholder="000.000.000-00"
              />
            )}
          </InputMask>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Segurança</h3>
          {!isEditingPassword ? (
            <Button 
              onClick={handlePasswordEdit} 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              Alterar Senha
            </Button>
          ) : (
            <Button 
              onClick={handlePasswordSave} 
              className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Senha
                </>
              )}
            </Button>
          )}
        </div>

        {isEditingPassword && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg">
            <div className="space-y-3">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.senhaAtual}
                  onChange={(e) => setPasswordData({...passwordData, senhaAtual: e.target.value})}
                  className="bg-white pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  disabled={isLoading}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.novaSenha}
                  onChange={(e) => setPasswordData({...passwordData, novaSenha: e.target.value})}
                  className="bg-white pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={isLoading}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Endereços</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-sm text-gray-500">Principal</span>
                  {hasAddress ? (
                    <>
                      <h4 className="font-medium">{addressLine}</h4>
                      <p className="text-sm text-gray-600">{locationLine}</p>
                      <p className="text-sm text-gray-600">CEP: {cep}</p>
                    </>
                  ) : (
                    <h4 className="font-medium">Nenhum endereço cadastrado</h4>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;