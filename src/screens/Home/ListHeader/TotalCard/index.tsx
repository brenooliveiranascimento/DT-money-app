import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useTransactionContext } from "@/context/transaction.context";

export const TotalCard = () => {
  const { totalTransactions } = useTransactionContext();

  return (
    <View className="bg-accent-brand-dark min-w-[280] rounded-[6] px-8 py-5 ml-6 mr-[42]">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base ">Total</Text>
        <MaterialIcons name="attach-money" color={colors.white} size={26} />
      </View>
      <Text className="text-3xl text-gray-400 font-bold">
        R$ {totalTransactions.total.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
};
