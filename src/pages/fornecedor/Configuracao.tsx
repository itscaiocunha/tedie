
import { useState } from "react";
import { SupplierHeader } from "@/components/Supplier/SupplierHeader";
import { SupplierSidebar } from "@/components/Supplier/SupplierSidebar.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const Configuracao = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <SupplierSidebar open={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Configurações</h1>
            <p className="text-gray-600 mt-1">Gerencie as configurações da sua conta</p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="business">Empresa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais de acesso
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" defaultValue="Fernando Silva" />
                    </div>
                  </div>
                  
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Seu email" defaultValue="fernando@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Nova Senha</Label>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password-confirm">Confirmar Nova Senha</Label>
                      <Input id="password-confirm" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Empresa</CardTitle>
                  <CardDescription>
                    Atualize as informações da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input id="company-name" placeholder="Nome da empresa" defaultValue="FS Moda Ltda" />
                    </div>
                  </div>
                  
                  <div className="grid w-full gap-4 md:grid-cols-2">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" defaultValue="12.345.678/0001-90" />
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="ie">Inscrição Estadual</Label>
                      <Input id="ie" placeholder="Inscrição estadual" defaultValue="123456789" />
                    </div>
                  </div>
                  
                  <div className="grid w-full gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" placeholder="Endereço completo" defaultValue="Av. Paulista, 1000, São Paulo - SP" />
                    </div>
                  </div>
                  
                  <div className="grid w-full gap-4 md:grid-cols-2">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 0000-0000" defaultValue="(11) 3456-7890" />
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="website">Site</Label>
                      <Input id="website" placeholder="www.example.com" defaultValue="www.fsmoda.com.br" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Informações Bancárias</CardTitle>
                  <CardDescription>
                    Configure suas informações para recebimentos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full gap-4 md:grid-cols-3">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="bank">Banco</Label>
                      <Input id="bank" placeholder="Nome do banco" defaultValue="Banco Brasil" />
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="agency">Agência</Label>
                      <Input id="agency" placeholder="0000" defaultValue="1234" />
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="account">Conta</Label>
                      <Input id="account" placeholder="00000-0" defaultValue="56789-0" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Configuracao;