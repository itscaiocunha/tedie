export interface ProductItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

export interface FreteOption {
  company: {
    id: string;
    name: string;
  };
  price: number;
  delivery_time: number;
}

export interface ModalExclusaoState {
  isOpen: boolean;
  itemId: number | null;
  itemNome: string;
}

export interface CheckoutFormData {
  cepDestino: string;
  frete: FreteOption[];
  freteSelecionado: FreteOption | null;
  cupom: string;
  desconto: number;
}