import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronRight, ShoppingBag, Loader2, Clock, Package, Truck } from "lucide-react";

interface OrderItem {
  id: string | number;
  produto_id: number;
  quantidade: number;
  preco_unit: string;
  produto: {
    id: number;
    nome: string;
    preco: number;
  };
}

interface Order {
  id: string | number;
  usuario_id: number;
  total: string;
  status: string;
  data_pedido: string;
  itens: OrderItem[];
}

const formatCurrency = (value: number | string) => {
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(',', '.')) 
    : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericValue);
};

const UserProfileOrders = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return {
          icon: <Clock className="mr-1 h-3 w-3" />,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      case 'separação':
        return {
          icon: <Package className="mr-1 h-3 w-3" />,
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800'
        };
      case 'caminho':
        return {
          icon: <Truck className="mr-1 h-3 w-3" />,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800'
        };
      case 'entregue':
        return {
          icon: <Check className="mr-1 h-3 w-3" />,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        };
      default:
        return {
          icon: <Clock className="mr-1 h-3 w-3" />,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      setError("Usuário não autenticado. Faça login para visualizar seus pedidos.");
      setLoading(false);
      return;
    }
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://tedie-api.vercel.app/api/pedidos?id=${userId}`);

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // Verificação da nova estrutura da API
        if (!data || !data.success || !Array.isArray(data.data)) {
          throw new Error("Formato de dados inválido da API");
        }

        // Mapeia os dados para a estrutura esperada pelo componente
        const validOrders = data.data.filter((order: any) => 
          order && order.id && order.data_pedido && order.status && order.total !== undefined
        );

        setOrders(validOrders.length > 0 ? validOrders : null);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setOrders(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const toggleOrderExpand = (orderId: string | number) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Renderização condicional
  if (!userId && error) {
    return (
      <div className="flex flex-col items-center rounded-lg bg-white p-8 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-3 text-lg font-medium">Acesso não autorizado</h3>
        <p className="mt-1 text-gray-500">{error}</p>
        <Link to="/login" className="mt-6">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
            Fazer login
          </Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
        <p className="mt-4 text-sm">Carregando seus pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center">
        <p className="text-red-600">Erro ao carregar pedidos</p>
        <p className="mt-1 text-sm text-red-500">{error}</p>
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (orders === null || orders.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-lg bg-white p-8 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-3 text-lg font-medium">Nenhum pedido encontrado</h3>
        <p className="mt-1 text-gray-500">
          Você ainda não fez nenhum pedido em nossa loja.
        </p>
        <Link to="/" className="mt-6">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
            Explorar produtos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Histórico de Pedidos</h2>
        <span className="text-sm text-gray-500">
          {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusDetails = getStatusDetails(order.status);
          
          return (
            <div key={order.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Pedido #{order.id}</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(order.data_pedido)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusDetails.bgColor} ${statusDetails.textColor}`}>
                      {statusDetails.icon}
                      {order.status}
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleOrderExpand(order.id)}
                  aria-label={
                    expandedOrders.includes(order.id)
                      ? "Recolher detalhes"
                      : "Expandir detalhes"
                  }
                >
                  {expandedOrders.includes(order.id) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {expandedOrders.includes(order.id) && (
                <div className="border-t p-4">
                  <h3 className="mb-3 text-sm font-medium">Itens do pedido</h3>
                  <div className="space-y-4">
                    {order.itens?.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{item.produto.nome}</h4>
                          <div className="mt-1 flex justify-between">
                            <span className="text-sm text-gray-500">
                              Qtd: {item.quantidade}
                            </span>
                            <span className="text-sm font-medium">
                              {formatCurrency(item.preco_unit)}
                            </span>
                          </div>
                          <div className="mt-1 text-right text-xs text-gray-500">
                            Total: {formatCurrency(Number(item.preco_unit) * item.quantidade)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfileOrders;