import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useTransactionContext } from "@/context/transaction.context";

export const RevenueCard = () => {
  const { totalTransactions } = useTransactionContext();

  return (
    <View className="bg-gray-900 min-w-[280] ml-8 rounded-[6] p-8 h-full">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-500 text-lg ">Entrada</Text>
        <MaterialIcons
          name="arrow-circle-up"
          color={colors["accent-brand-light"]}
          size={35}
        />
      </View>
      <Text className="text-3xl text-gray-400 font-bold">
        R$ {totalTransactions.revenue.toFixed(2).replace(".", ",")}
      </Text>
      <Text className="text-gray-700 text-lg mt-3">última entrada em ...</Text>
    </View>
  );
};
