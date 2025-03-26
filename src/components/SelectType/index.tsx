import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { colors } from "@/styles/colors";

interface TransactionTypeSelectorProps {
  typeId: number | null;
  setTransactionType: (type: number) => void;
}

export default function TransactionTypeSelector({
  typeId,
  setTransactionType,
}: TransactionTypeSelectorProps) {
  return (
    <View className="flex-row justify-between bg-[#202024] rounded-lg w-full gap-2 mt-2">
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionTypes.REVENUE)}
        className={`flex-row items-center p-2 rounded-lg flex-1 justify-center ${
          typeId === TransactionTypes.REVENUE ? "bg-[#00875F]" : "bg-[#29292E]"
        } h-[58]`}
      >
        <MaterialIcons
          name="arrow-circle-up"
          size={30}
          color={
            typeId === TransactionTypes.REVENUE
              ? colors["white"]
              : colors["accent-brand-light"]
          }
          className="mr-2"
        />
        <Text className="text-white font-bold">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        key={typeId}
        onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
        className={`flex-row items-center p-2 rounded-lg flex-1 justify-center ${
          typeId === TransactionTypes.EXPENSE ? "bg-accent-red" : "bg-[#29292E]"
        } h-[58]`}
      >
        <MaterialIcons
          name="arrow-circle-down"
          size={30}
          color={
            typeId === TransactionTypes.EXPENSE
              ? colors["white"]
              : colors["accent-red"]
          }
          className="mr-2"
        />
        <Text className="text-white font-bold">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
