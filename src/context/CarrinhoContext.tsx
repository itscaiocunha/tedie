import React, { createContext, useContext, useState, ReactNode } from "react";

interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (item: ItemCarrinho) => void;
  limparCarrinho: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

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

  const limparCarrinho = () => setItens([]);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarAoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (context === undefined) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
