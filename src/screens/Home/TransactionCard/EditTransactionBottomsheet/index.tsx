import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { FC, useState } from "react";
import { colors } from "@/styles/colors";
import { AppInput } from "@/components/input";
import { useBottomSheetContext } from "@/context/bottomsheet.context";

interface Props {
  transaction: Transaction;
}

export const EditTransactionBottomsheet: FC<Props> = ({ transaction }) => {
  const { closeBottomSheet } = useBottomSheetContext();
  const [editedTransaction, setEditedTransaction] = useState("adw");

  return (
    <View className="px-8 py-5">
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">Editar transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray["700"]} />
      </View>
      <View className="flex-1">
        <AppInput
          onChangeText={setEditedTransaction}
          value={editedTransaction}
          className="font-base text-white mt-[10]"
          bg="bg-dark"
          rightIconName="filter-list"
        />
        <AppInput
          onChangeText={setEditedTransaction}
          value={editedTransaction}
          className="font-base text-white mt-[10]"
          bg="bg-dark"
        />
      </View>
    </View>
  );
};
