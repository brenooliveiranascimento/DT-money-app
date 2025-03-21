import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export const TotalCard = () => {
  return (
    <View className="bg-accent-brand-dark w-[280] ml-8 rounded-[6] p-8 h-full">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-500 text-lg ">Total</Text>
        <MaterialIcons name="attach-money" color={colors.white} size={35} />
      </View>
      <Text className="text-3xl text-gray-400 font-bold">R$ 0</Text>
    </View>
  );
};
