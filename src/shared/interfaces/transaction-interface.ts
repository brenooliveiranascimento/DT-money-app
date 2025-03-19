import { ITransactionCategory } from "./transaction-categoty.interface";
import { ITransactionType } from "./transaction-type-interface";
import { IUser } from "./user-interface";

export interface ITransaction {
  id: number;
  typeId: number;
  categoryId: number;
  userId: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  type: ITransactionType;
  category: ITransactionCategory;
  user?: IUser;
}
