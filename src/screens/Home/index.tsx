import { AppHeader } from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Evaluetions } from "./Evaluetions";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth.context";
import { useTransactionContext } from "@/context/transaction.context";
import { TransactionCard } from "./TransactionCard";
import { colors } from "@/styles/colors";

const Home = () => {
  const { handleLogout } = useContext(AuthContext);
  const {
    fetchTransactions,
    transactions,
    loading,
    loadMoreTransactions,
    refreshTransactions,
    refreshLoading,
  } = useTransactionContext();

  useEffect(() => {
    fetchTransactions({ page: 1, refresh: false });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-1000 w-full">
      <FlatList
        data={transactions}
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={refreshTransactions}
            tintColor={colors["accent-brand-light"]}
            colors={[colors["accent-brand-light"]]}
          />
        }
        ListHeaderComponent={Evaluetions}
        keyExtractor={(transaction) => `transaction-${transaction.id}`}
        // ListEmptyComponent={<Text>Nenhuma transação encontrada</Text>}
        renderItem={({ item: transaction }) => {
          return <TransactionCard transaction={transaction} />;
        }}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="purple" /> : null
        }
      />

      {/* <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};
export default Home;
