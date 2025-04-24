import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { ProductItem, ModalExclusaoState } from "../types/checkoutTypes";

interface ModalEmailState {
  isOpen: boolean;
  message?: string;
}

export const useCarrinhoManager = (
  initialItems: ProductItem[] = [],
  syncCallback?: (items: ProductItem[]) => Promise<ProductItem[] | void>
) => {
  const [itens, setItens] = useState<ProductItem[]>(initialItems);
  const [isSyncing, setIsSyncing] = useState(false);
  const [modalExclusao, setModalExclusao] = useState<ModalExclusaoState>({
    isOpen: false,
    itemId: null,
    itemNome: "",
  });
  const [modalEmail, setModalEmail] = useState<ModalEmailState>({
    isOpen: false,
    message: "",
  });

  // Controle do último sync
  const lastSyncRef = useRef<number>(0);
  const syncIntervalRef = useRef<NodeJS.Timeout>();
  const jaSincronizou = useRef(false);

  // Função para sincronizar o carrinho
  const handleSyncCarrinho = useCallback(async () => {
    if (!syncCallback || isSyncing || jaSincronizou.current) return;

    const now = Date.now();
    // Só sincroniza se passaram pelo menos 10 minutos (600000 ms)
    if (now - lastSyncRef.current < 600000 && lastSyncRef.current !== 0) {
      return;
    }

    setIsSyncing(true);
    try {
      const resultado = await syncCallback(itens);

      if (resultado && Array.isArray(resultado)) {
        setItens(resultado);
      }
      lastSyncRef.current = now;
      jaSincronizou.current = true; // Evita chamada repetida
    } catch (error) {
      console.error("Erro na sincronização:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [itens, syncCallback, isSyncing]);

  useEffect(() => {
    // Sincroniza somente quando necessário, ou seja, apenas ao carregar
    if (itens.length > 0 && !jaSincronizou.current) {
      handleSyncCarrinho();
      jaSincronizou.current = true;
    }
  }, [itens, handleSyncCarrinho]);

  // Configura sincronização periódica a cada 10 minutos
  useEffect(() => {
    if (itens.length > 0 && !jaSincronizou.current) {
      syncIntervalRef.current = setInterval(() => {
        handleSyncCarrinho();
      }, 600000); // 10 minutos
    }
    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [itens, handleSyncCarrinho]);

  const atualizarItens = useCallback((novosItens: ProductItem[]) => {
    // Remove duplicatas mantendo a última versão de cada item
    const itensUnicos = novosItens.reduce((acc, item) => {
      const existingIndex = acc.findIndex(
        (i) => i.produto_id === item.produto_id
      );
      if (existingIndex >= 0) {
        acc[existingIndex] = item;
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as ProductItem[]);

    setItens(itensUnicos);
    localStorage.setItem("itensCarrinho", JSON.stringify(itensUnicos));
  }, []);

  const adicionarItem = useCallback(
    (novoItem: ProductItem) => {
      const novosItens = [...itens, novoItem];
      atualizarItens(novosItens);
      toast.success(`${novoItem.nome} adicionado ao carrinho`);
    },
    [itens, atualizarItens]
  );

  const atualizarQuantidade = useCallback(
    (itemId: number, novaQuantidade: number) => {
      const novosItens = itens.map((item) =>
        item.produto_id === itemId
          ? { ...item, quantidade: novaQuantidade }
          : item
      );
      atualizarItens(novosItens);
    },
    [itens, atualizarItens]
  );

  const abrirModalExclusao = (id: number, nome: string) => {
    setModalExclusao({
      isOpen: true,
      itemId: id,
      itemNome: nome,
    });
  };

  const fecharModalExclusao = () => {
    setModalExclusao({
      isOpen: false,
      itemId: null,
      itemNome: "",
    });
  };

  const abrirModalEmail = (message?: string) => {
    setModalEmail({
      isOpen: true,
      message,
    });
  };

  const fecharModalEmail = () => {
    setModalEmail({
      isOpen: false,
      message: "",
    });
  };

  const confirmarExclusao = useCallback(() => {
    if (modalExclusao.itemId) {
      const novosItens = itens.filter(
        (item) => item.produto_id !== modalExclusao.itemId
      );
      atualizarItens(novosItens);
      toast.success("Item removido do carrinho");
    }
    fecharModalExclusao();
  }, [itens, modalExclusao.itemId, atualizarItens]);

  return {
    itens,
    setItens: atualizarItens,
    adicionarItem,
    atualizarQuantidade,
    modalExclusao,
    abrirModalExclusao,
    fecharModalExclusao,
    confirmarExclusao,
    modalEmail,
    abrirModalEmail,
    fecharModalEmail,
    isSyncing,
  };
};
