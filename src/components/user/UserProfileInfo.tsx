import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";

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

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const API_URL = `https://tedie-api.vercel.app/api/usuario?id=${userId}`;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na resposta da API");
        return response.json();
      })
      .then((data) => {
        console.log("Dados completos:", data);
        // Verifica se os dados de endereço estão em um subobjeto
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
          // Se não houver subobjeto endereco, mantém a estrutura plana
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
      })
      .catch((error) => console.error("Erro ao buscar dados do usuário:", error));
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

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
      hasAddress: endereco.logradouro && endereco.cep // Verifica se há dados básicos de endereço
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
          <Button onClick={handleSave} className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" value={userData.nome} onChange={(e) => setUserData({ ...userData, nome: e.target.value })} className="bg-white" disabled={!isEditing} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="bg-white" disabled={!isEditing} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" value={userData.telefone} onChange={(e) => setUserData({ ...userData, telefone: e.target.value })} className="bg-white" disabled={!isEditing} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" value={userData.cpf} onChange={(e) => setUserData({ ...userData, cpf: e.target.value })} className="bg-white" disabled={!isEditing} />
        </div>
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