import { AppHeader } from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Evaluetions } from "./Evaluetions";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth.context";
import { useTransactionContext } from "@/context/transaction.context";
import { TransactionCard } from "./TransactionCard";
import { RefreshControlComponent } from "./RefreshControl";

const Home = () => {
  const { handleLogout } = useContext(AuthContext);
  const {
    fetchTransactions,
    transactions,
    loading,
    loadMoreTransactions,
    refreshTransactions,
  } = useTransactionContext();

  useEffect(() => {
    (async () => {
      fetchTransactions({ page: 1, refresh: false });
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-1000 w-full ">
      <FlatList
        data={transactions}
        refreshControl={<RefreshControlComponent />}
        ListHeaderComponent={Evaluetions}
        keyExtractor={(transaction) => `transaction-${transaction.id}`}
        renderItem={({ item: transaction }) => (
          <TransactionCard transaction={transaction} />
        )}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="purple" /> : null
        }
      />
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Home;
