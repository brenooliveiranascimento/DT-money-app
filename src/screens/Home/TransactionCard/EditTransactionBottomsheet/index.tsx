import { Text, TextInput, View } from "react-native";
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
      <View className="flex-1 mt-8">
        <TextInput
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray["700"]}
        />
        <TextInput
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4"
          placeholder="Preço"
          placeholderTextColor={colors.gray["700"]}
        />
      </View>
    </View>
  );
};
