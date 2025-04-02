import { ScrollView, View } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { FilterInput } from "./FilterInput";
import { TransactionCard } from "./TransactionCard";
import { useTransactionContext } from "@/context/transaction.context";
import { TransactionTypes } from "@/shared/enums/transaction-types";

export const ListHeader = () => {
  const { totalTransactions } = useTransactionContext();

  return (
    <View>
      <AppHeader />
      <View className="h-[150] w-full">
        <View className="bg-dark h-[50]" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="absolute pl-6 h-[141]"
        >
          <TransactionCard
            type={TransactionTypes.REVENUE}
            label="Entrada"
            bgColor="gray-900"
            amount={totalTransactions.revenue}
          />
          <TransactionCard
            type={TransactionTypes.EXPENSE}
            label="Saída"
            bgColor="gray-900"
            amount={totalTransactions.expense}
          />
          <TransactionCard
            type="total"
            label="Total"
            bgColor="accent-brand-dark"
            amount={totalTransactions.total}
          />
        </ScrollView>
      </View>
      <FilterInput />
    </View>
  );
};
