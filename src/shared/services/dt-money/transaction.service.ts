import { dtMoneyApi } from "@/shared/api/dt-money";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-params";
import {
  GetTransactionsParams,
  GetTransactionsResponse,
} from "@/shared/interfaces/https/get-transactions-response";
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-params";
import { TransactionCategory } from "@/shared/interfaces/transaction-categoty.interface";

export const getTransactions = async (
  params: GetTransactionsParams
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionsResponse>(
    "/transaction",
    {
      params: {
        ...params,
        categoryIds: Object.keys(params.filters.categoryIds) ?? [],
      },
    }
  );
  return data;
};

export const deleteTransaction = async (id: number) => {
  await dtMoneyApi.delete(`/transaction/${id}`);
};

export const updateTransaction = async (
  transaction: UpdateTransactionInterface
) => {
  await dtMoneyApi.put(`/transaction`, transaction);
};

export const createTransaction = async (
  transaction: CreateTransactionInterface
) => {
  await dtMoneyApi.post("/transaction", transaction);
};

export const getTransactionCategories = async () => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    "/transaction/categories"
  );
  return data;
};
