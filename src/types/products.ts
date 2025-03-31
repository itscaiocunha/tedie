export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  Estoque: number;
  imagem: string;
  categoria_id?: number;
  IdEmpresa?: number;
  ean?: string;
}

export interface ApiResponse {
  products: Product[];
  executionTime?: number;
  originalResponse?: string;
  parsingDetails?: any;
}