export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  imagens?: string[]; // Para a galeria de imagens
  estoque: number;
  avaliacao: number; // Nota média (ex: 4.5)
  avaliacoes: number; // Número total de avaliações
}