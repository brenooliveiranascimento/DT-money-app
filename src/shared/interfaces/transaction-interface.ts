import { TransactionCategory } from "./transaction-category.interface";
import { TransactionType } from "./transaction-type-interface";

export interface Transaction {
  id: number;
  typeId: number;
  categoryId: number;
  description: string | undefined;
  userId: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  type: TransactionType;
  category: TransactionCategory;
}
