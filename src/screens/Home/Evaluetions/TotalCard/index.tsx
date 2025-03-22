import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useTransactionContext } from "@/context/transaction.context";

export const TotalCard = () => {
  const { totalTransactions } = useTransactionContext();

  return (
    <View className="bg-accent-brand-dark min-w-[280] ml-8 rounded-[6] p-8 h-full">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-500 text-lg ">Total</Text>
        <MaterialIcons name="attach-money" color={colors.white} size={35} />
      </View>
      <Text className="text-3xl text-gray-400 font-bold">
        R$ {totalTransactions.total.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
};
