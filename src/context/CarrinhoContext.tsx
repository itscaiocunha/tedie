import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
  refrigerado: boolean;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  setItens: React.Dispatch<React.SetStateAction<ItemCarrinho[]>>; // <-- Adicionado
  adicionarAoCarrinho: (item: ItemCarrinho) => void;
  limparCarrinho: () => void;
  cartItems: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    const itensSalvos = localStorage.getItem("itensCarrinho");
    return itensSalvos ? JSON.parse(itensSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem("itensCarrinho", JSON.stringify(itens));
  }, [itens]);

  const adicionarAoCarrinho = (item: ItemCarrinho) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find((i) => i.id === item.id);
      if (itemExistente) {
        return prevItens.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        );
      } else {
        return [...prevItens, item];
      }
    });
  };

  const limparCarrinho = () => {
    setItens([]);
    localStorage.removeItem("itensCarrinho");
  };

  const cartItems = itens.reduce((total, item) => total + item.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ itens, setItens, adicionarAoCarrinho, limparCarrinho, cartItems }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
