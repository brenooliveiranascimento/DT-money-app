import { TransactionTypes } from "@/shared/enums/transaction-types";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { FC } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { format } from "date-fns";

interface Props {
  transaction: Transaction;
}

export const TransactionCard: FC<Props> = ({ transaction }) => {
  const isRevenue = transaction.type.id === TransactionTypes.EXPENSE;

  return (
    <View className="self-center w-[85%] h-[140] bg-gray-900 mt-3  rounded-[6] p-6">
      <Text className="text-white text-lg">{transaction.category.name}</Text>
      <Text
        className={`${
          isRevenue ? "text-accent-brand-light" : "text-accent-red"
        } text-3xl font-bold mt-2`}
      >
        {!isRevenue && "-"}
        {transaction.value.toFixed(2).replace(".", ",")}
      </Text>
      <View className="flex-row w-full justify-between items-center">
        <View className="items-center flex-row mt-3">
          <MaterialIcons
            name="label-outline"
            size={23}
            color={colors.gray[700]}
          />
          <Text className="text-gray-700 text-lg ml-2">
            {transaction.category.name}
          </Text>
        </View>
        <View className="items-center flex-row mt-3">
          <MaterialIcons
            name="calendar-month"
            size={23}
            color={colors.gray[700]}
          />
          <Text className="text-gray-700 text-lg ml-2">
            {format(transaction.createdAt, "dd/MM/yyyy")}
          </Text>
        </View>
      </View>
    </View>
  );
};
