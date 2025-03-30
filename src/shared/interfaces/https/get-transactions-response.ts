import { TotalTransactions } from "../total-transactions";
import { Transaction } from "../transaction-interface";

export type OrderDirection = "ASC" | "asc" | "DESC" | "desc";

export interface Pagination {
  page: number;
  perPage: number;
}

export interface Filters {
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryIds: Record<number, boolean> | number[];
}

export interface GetTransactionsParams {
  userId: number;
  page: number;
  perPage: number;
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryIds: Record<number, boolean> | number[];
  sort?: {
    id?: OrderDirection;
  };
  searchText?: string;
}

export interface GetTransactionsResponse {
  totalTransactions: TotalTransactions;
  data: Transaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
}
