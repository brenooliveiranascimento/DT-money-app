import { dtMoneyApi } from "@/shared/api/dt-money";
import {
  GetTransactionsParams,
  GetTransactionsResponse,
} from "@/shared/interfaces/https/get-transactions-response";

export const GetTransactions = async (
  params: GetTransactionsParams
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionsResponse>(
    "/transaction",
    {
      params,
    }
  );
  return data;
};
