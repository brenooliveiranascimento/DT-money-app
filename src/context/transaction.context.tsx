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
  useMemo,
  useState,
} from "react";
import { useAuthContext } from "./auth.context";
import { useSnackbarContext } from "./snackbacr.context";
import { TotalTransactions } from "@/shared/interfaces/total-transactions";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-params";
import { TransactionCategory } from "@/shared/interfaces/transaction-categoty.interface";
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-params";

export interface IFilterParams {
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryIds?: Record<number, boolean>;
}

export interface SearchFilterParams {
  key: keyof Filters;
  value: Date | number | boolean;
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
  createTransaction: (transcation: CreateTransactionInterface) => Promise<void>;
  categories: TransactionCategory[];
  fetchCategories: () => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  filters: Filters;
  handleCategoryFilter: (categoryId: number) => void;
  resetFilter: () => void;
};

const filterInitailData = {
  categoryIds: {},
  from: undefined,
  to: undefined,
  typeId: undefined,
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
  const [filters, setFilters] = useState<Filters>({
    categoryIds: {},
    from: undefined,
    to: undefined,
    typeId: undefined,
  });
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

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

  const handleCategoryFilter = (categoryId: number) => {
    setFilters({
      ...filters,
      categoryIds: {
        ...filters.categoryIds,
        [categoryId]: !Boolean(filters.categoryIds[categoryId]),
      },
    });
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await dtMoneyService.createTransaction(transaction);
    await refreshTransactions();
  };

  const updateTransaction = async (transaction: UpdateTransactionInterface) => {
    await dtMoneyService.updateTransaction(transaction);
    await refreshTransactions();
  };

  const categoryIds = useMemo(() => {
    return Object.entries(filters.categoryIds)
      .filter(([key, value]) => value)
      .map(([key, value]) => Number(key));
  }, [filters]);

  const refreshTransactions = useCallback(async () => {
    if (!user) return;
    const { page, perPage } = pagination;

    setRefreshLoading(true);

    const response = await dtMoneyService.getTransactions({
      page: 1,
      perPage: page * perPage,
      userId: user.id,
      searchText,
      ...filters,
      categoryIds,
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
        userId: user.id,
        searchText,
        ...filters,
        categoryIds,
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

  const fetchCategories = async () => {
    const categories = await dtMoneyService.getTransactionCategories();
    setCategories(categories);
  };

  const handleDelete = async (transactionId: number) => {
    await dtMoneyService.deleteTransaction(transactionId);
    await refreshTransactions();
  };

  const resetFilter = () => {
    setFilters(filterInitailData);
    fetchTransactions({ page: 1 });
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
        createTransaction,
        fetchCategories,  
        categories,
        updateTransaction,
        filters,
        handleCategoryFilter,
        resetFilter,
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
