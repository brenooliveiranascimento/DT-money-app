import { TransactionTypes } from "@/shared/enums/transaction-types";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { FC } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { format } from "date-fns";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { RightAction } from "./RightAction";
import { LeftAction } from "./LeftAction";

interface Props {
  transaction: Transaction;
}

export const TransactionCard: FC<Props> = ({ transaction }) => {
  const isRevenue = transaction.type.id === TransactionTypes.REVENUE;

  return (
    <Swipeable
      containerStyle={{
        alignItems: "center",
        alignSelf: "center",
        overflow: "visible",
        width: "90%",
        marginBottom: 16,
      }}
      overshootRight={false}
      overshootLeft={false}
      friction={1}
      enableTrackpadTwoFingerGesture
      rightThreshold={20}
      renderRightActions={() => <RightAction transaction={transaction} />}
      renderLeftActions={() => <LeftAction transaction={transaction} />}
    >
      <View className="h-[140] bg-gray-900 rounded-[6] p-6">
        <Text className="text-white text-base">
          {transaction.category.name}
        </Text>
        <Text
          className={`${
            isRevenue ? "text-accent-brand-light" : "text-accent-red"
          } text-2xl font-bold mt-2`}
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
            <Text className="text-gray-700 text-vase ml-2">
              {transaction.category.name}
            </Text>
          </View>
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="calendar-month"
              size={20}
              color={colors.gray[700]}
            />
            <Text className="text-gray-700 text-base ml-2">
              {format(transaction.createdAt, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
