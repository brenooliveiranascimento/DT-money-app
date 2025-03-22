import { TransactionTypes } from "@/shared/enums/transaction-types";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { FC, MutableRefObject, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { format } from "date-fns";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
interface Props {
  transaction: Transaction;
}

export const TransactionCard: FC<Props> = ({ transaction }) => {
  const isRevenue = transaction.type.id === TransactionTypes.EXPENSE;

  const swipeableRow: MutableRefObject<Swipeable | null> = useRef(null);

  const open = () => {
    swipeableRow?.current?.openRight();
  };

  const close = (callback: () => void) => {
    swipeableRow?.current?.close();
    callback();
  };

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 50 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <Text>Text</Text>
      </Reanimated.View>
    );
  }

  return (
    <Swipeable
      containerStyle={{
        height: 140,
        alignItems: "center",
      }}
      overshootRight={false}
      friction={1}
      enableTrackpadTwoFingerGesture
      rightThreshold={20}
      renderRightActions={RightAction}
    >
      <View className="w-[85%] h-[140] bg-gray-900 mt-3  rounded-[6] p-6 self-center">
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
