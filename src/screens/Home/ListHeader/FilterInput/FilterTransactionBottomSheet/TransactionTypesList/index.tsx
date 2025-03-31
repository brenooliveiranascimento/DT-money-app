import { useTransactionContext } from "@/context/transaction.context";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { colors } from "@/styles/colors";
import Checkbox from "expo-checkbox";
import { Text, View } from "react-native";

export const TransactionTypesList = () => {
  const { handleFilter, filters } = useTransactionContext();

  const handleTipoTransacaoChange = (transactionType: TransactionTypes) => {
    handleFilter({ key: "typeId", value: transactionType });
  };

  return (
    <View className="mb-6">
      <Text className="text-lg font-medium mb-4 text-gray-700">
        Tipo de Transação
      </Text>
      <View className="flex-row items-center py-2">
        <Checkbox
          value={filters.typeId === TransactionTypes.REVENUE}
          onValueChange={() =>
            handleTipoTransacaoChange(TransactionTypes.REVENUE)
          }
          color={
            filters.typeId === TransactionTypes.REVENUE
              ? colors["accent-brand-light"]
              : undefined
          }
          className="mr-4"
        />
        <Text className="text-lg text-white">Entrada</Text>
      </View>
      <View className="flex-row items-center py-2">
        <Checkbox
          value={filters.typeId === TransactionTypes.EXPENSE}
          onValueChange={() =>
            handleTipoTransacaoChange(TransactionTypes.EXPENSE)
          }
          color={
            filters.typeId === TransactionTypes.EXPENSE
              ? colors["accent-brand-light"]
              : undefined
          }
          className="mr-4"
        />
        <Text className="text-lg text-white">Saída</Text>
      </View>
    </View>
  );
};
