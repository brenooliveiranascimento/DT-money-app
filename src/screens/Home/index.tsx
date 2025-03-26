import { SafeAreaView } from "react-native-safe-area-context";
import { Evaluetions } from "./Evaluetions";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import { useEffect } from "react";
import { useTransactionContext } from "@/context/transaction.context";
import { TransactionCard } from "./TransactionCard";
import { colors } from "@/styles/colors";
import { useErrorHandler } from "@/shared/hooks/errorHandler";

const Home = () => {
  const { handleError } = useErrorHandler();

  const {
    fetchTransactions,
    transactions,
    loading,
    loadMoreTransactions,
    refreshTransactions,
    refreshLoading,
  } = useTransactionContext();

  const reloadTransactions = async () => {
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar transações");
    }
  };

  const fetchInitialTransactions = async () => {
    try {
      fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar transações");
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao buscar novas transações");
    }
  };

  useEffect(() => {
    fetchInitialTransactions();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-1000 w-full">
      <FlatList
        data={transactions}
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={reloadTransactions}
            tintColor={colors["accent-brand-light"]}
            colors={[colors["accent-brand-light"]]}
          />
        }
        ListHeaderComponent={Evaluetions}
        keyExtractor={(transaction) => `transaction-${transaction.id}`}
        ListEmptyComponent={
          <>
            {!loading && transactions.length === 0 && (
              <Text className="text-center text-gray-600 text-lg mt-4">
                Nenhuma transação encontrada
              </Text>
            )}
          </>
        }
        renderItem={({ item: transaction }) => (
          <TransactionCard transaction={transaction} />
        )}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={colors["accent-brand-light"]}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};
export default Home;
