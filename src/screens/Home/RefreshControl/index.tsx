import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/styles/colors";
import { RefreshControl } from "react-native";

export const RefreshControlComponent = () => {
  const { refreshLoading, refreshTransactions } = useTransactionContext();

  return (
    <RefreshControl
      refreshing={refreshLoading}
      onRefresh={refreshTransactions}
      colors={[colors.green]}
      tintColor={colors.green}
    />
  );
};
