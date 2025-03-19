import { ITransaction } from "./transaction-interface";

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  transactions: ITransaction[];
}
