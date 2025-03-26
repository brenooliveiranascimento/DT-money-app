import {
  Filters,
  Pagination,
} from "@/shared/interfaces/https/get-transactions-response";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import * as dtMoneyService from "@/shared/services/dt-money/transaction.service";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { useAuthContext } from "./auth.context";
import { useSnackbarContext } from "./snackbacr.context";
import { TotalTransactions } from "@/shared/interfaces/total-transactions";

export interface SearchFilterParams {
  key: keyof Filters;
  value: Date | number;
}

export interface FetchTransactionsParams {
  page: number;
}

type TransactionTextType = {
  transactions: Transaction[];
  loading: boolean;
  loadMoreTransactions: () => void;
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>;
  refreshTransactions: () => void;
  setSearchFilter: (text: string) => void;
  searchFilter: string;
  handleFilter: (params: SearchFilterParams) => void;
  refreshLoading: boolean;
  totalTransactions: TotalTransactions;
  handleDelete: (transactionId: number) => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionTextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const { notify } = useSnackbarContext();

  const [loading, setLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(15);
  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({});
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    { expense: 0, revenue: 0, total: 0 }
  );

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
  });

  const handleFilter = ({ key, value }: SearchFilterParams) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const refreshTransactions = useCallback(async () => {
    if (!user) return;
    const { page, perPage } = pagination;

    setRefreshLoading(true);

    const response = await dtMoneyService.getTransactions({
      page: 1,
      perPage: page * perPage,
      filters,
      userId: user.id,
      searchText,
    });

    setTransactions(response.data);

    setTotalTransactions(response.totalTransactions);
    setPagination({
      ...pagination,
      page,
    });
    setTotalPages(response.totalPages);
    setRefreshLoading(false);
  }, [pagination, notify, user, filters, searchText]);

  const fetchTransactions = useCallback(
    async ({ page = 1 }) => {
      if (!user) return;

      setLoading(true);

      const response = await dtMoneyService.getTransactions({
        page: page,
        perPage: pagination.perPage,
        filters,
        userId: user.id,
        searchText,
      });

      if (page === 1) {
        setTransactions(response.data);
      } else {
        setTransactions((prev) => [...prev, ...response.data]);
      }

      setTotalTransactions(response.totalTransactions);
      setPagination({
        ...pagination,
        page,
      });
      setTotalPages(response.totalPages);

      setLoading(false);
    },
    [pagination, notify, user, filters, searchText]
  );

  const loadMoreTransactions = useCallback(() => {
    if (loading || pagination.page >= totalPages) return;
    fetchTransactions({ page: pagination.page + 1 });
  }, [loading, pagination, fetchTransactions, totalPages]);

  const handleDelete = async (transactionId: number) => {
    await dtMoneyService.deleteTransaction(transactionId);
    await refreshTransactions();
  };

  return (
    <TransactionContext.Provider
      value={{
        fetchTransactions,
        loading,
        loadMoreTransactions,
        transactions,
        refreshTransactions,
        searchFilter: searchText,
        setSearchFilter: setSearchText,
        handleFilter,
        refreshLoading,
        totalTransactions,
        handleDelete,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  return context;
};
