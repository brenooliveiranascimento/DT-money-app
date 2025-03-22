import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useTransactionContext } from "@/context/transaction.context";
import { useMemo } from "react";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const RevenueCard = () => {
  const { totalTransactions, transactions } = useTransactionContext();

  const lastTransaction = useMemo(() => {
    return transactions.find(({ type }) => {
      return type.id === TransactionTypes.REVENUE;
    });
  }, [transactions]);

  return (
    <View className="bg-gray-900 min-w-[280] rounded-[6] px-8 py-6">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base ">Entrada</Text>
        <MaterialIcons
          name="arrow-circle-up"
          color={colors["accent-brand-light"]}
          size={26}
        />
      </View>
      <Text className="text-2xl text-gray-400 font-bold">
        R$ {totalTransactions.revenue.toFixed(2).replace(".", ",")}
      </Text>
      {lastTransaction && (
        <Text className="text-gray-700 text-sm mt-3">
          {format(
            lastTransaction.createdAt,
            "'Última entrada em' d 'de' MMMM",
            {
              locale: ptBR,
            }
          )}
        </Text>
      )}
    </View>
  );
};
