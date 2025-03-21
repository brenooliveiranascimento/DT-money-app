import { ScrollView, Text, View } from "react-native";
import { RevenueCard } from "./RevenueCard";
import { ExpenseCard } from "./ExpenseCard";
import { TotalCard } from "./TotalCard";

export const Evaluetions = () => {
  return (
    <View className="h-[180] w-full">
      <View className="bg-black h-[80]" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        className="absolute"
      >
        <RevenueCard />
        <ExpenseCard />
        <TotalCard />
      </ScrollView>
    </View>
  );
};
