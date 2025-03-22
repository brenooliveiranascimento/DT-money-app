import { TransactionTypes } from "@/shared/enums/transaction-types";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { format } from "date-fns";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
interface Props {
  transaction: Transaction;
}

export const TransactionCard: FC<Props> = ({ transaction }) => {
  const isRevenue = transaction.type.id === TransactionTypes.REVENUE;

  function RightAction(_: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 80 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <TouchableOpacity
          className="h-[140] bg-accent-red-dark w-[80] rounded-r-[6] items-center justify-center"
          onPress={() => {}}
          activeOpacity={0.8}
        >
          <MaterialIcons name="delete-outline" color={colors.white} size={30} />
        </TouchableOpacity>
      </Reanimated.View>
    );
  }

  function LeftAction(_: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value - 80 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-[140] bg-accent-blue-dark w-[80] rounded-l-[6] items-center justify-center"
          onPress={() => {}}
        >
          <MaterialIcons color={colors.white} name="edit" size={30} />
        </TouchableOpacity>
      </Reanimated.View>
    );
  }

  return (
    <Swipeable
      containerStyle={{
        alignItems: "center",
        width: "85%",
        alignSelf: "center",
        marginTop: 16,
      }}
      overshootRight={false}
      friction={1}
      enableTrackpadTwoFingerGesture
      rightThreshold={20}
      renderRightActions={RightAction}
      renderLeftActions={LeftAction}
    >
      <View className="h-[140] bg-gray-900   rounded-[6] p-6 self-center">
        <Text className="text-white text-lg">{transaction.category.name}</Text>
        <Text
          className={`${
            isRevenue ? "text-accent-brand-light" : "text-accent-red"
          } text-3xl font-bold mt-2`}
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
            <Text className="text-gray-700 text-lg ml-2">
              {transaction.category.name}
            </Text>
          </View>
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="calendar-month"
              size={23}
              color={colors.gray[700]}
            />
            <Text className="text-gray-700 text-lg ml-2">
              {format(transaction.createdAt, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
