import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export const ExpenseCard = () => {
  return (
    <View className="bg-gray-900 w-[280] ml-8 rounded-[6] p-8 h-full">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-500 text-lg ">Saída</Text>
        <MaterialIcons
          name="arrow-circle-down"
          color={colors["accent-red"]}
          size={35}
        />
      </View>
      <Text className="text-3xl text-gray-400 font-bold">R$ 0</Text>
      <Text className="text-gray-700 text-lg">última Saída em ...</Text>
    </View>
  );
};
