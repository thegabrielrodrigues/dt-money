export interface TransactionDTO {
  id: number;
  description: string;
  price: number;
  type: 'income' | 'expense';
  category: string;
  createdAt: string;
}
