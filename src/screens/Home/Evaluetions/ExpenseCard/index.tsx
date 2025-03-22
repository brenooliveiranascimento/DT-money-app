import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useTransactionContext } from "@/context/transaction.context";
import { useMemo } from "react";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ExpenseCard = () => {
  const { totalTransactions, transactions } = useTransactionContext();

  const lastTransaction = useMemo(() => {
    return transactions.find(({ type }) => {
      return type.id === TransactionTypes.EXPENSE;
    });
  }, [transactions]);

  return (
    <View className="bg-gray-900 min-w-[280] rounded-[6] px-8 py-6 ml-6">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base ">Saída</Text>
        <MaterialIcons
          name="arrow-circle-down"
          color={colors["accent-red"]}
          size={26}
        />
      </View>
      <Text className="text-2xl text-gray-400 font-bold">
        R$ ${totalTransactions.expense.toFixed(2).replace(".", ",")}
      </Text>
      {lastTransaction && (
        <Text className="text-gray-700 text-sm mt-3">
          {format(lastTransaction.createdAt, "'Última saída em' d 'de' MMMM", {
            locale: ptBR,
          })}
        </Text>
      )}
    </View>
  );
};
