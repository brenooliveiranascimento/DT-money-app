import { Transaction } from "./transaction-interface";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  transactions: Transaction[];
}
