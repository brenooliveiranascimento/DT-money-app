import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { EditTransactionBottomsheet } from "../EditTransactionBottomsheet";

interface Props {
  transaction: Transaction;
}

export const LeftAction: FC<Props> = ({ transaction }) => {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <>
      <Pressable
        onPress={() =>
          openBottomSheet(
            <EditTransactionBottomsheet transactionToUpdate={transaction} />
          )
        }
      >
        <View className="h-[140] bg-accent-blue-background-primary w-[80] rounded-l-[6] items-center justify-center z-99">
          <MaterialIcons color={colors.white} name="edit" size={30} />
        </View>
      </Pressable>
    </>
  );
};
