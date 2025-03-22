import { ScrollView, Text, View } from "react-native";
import { RevenueCard } from "./RevenueCard";
import { ExpenseCard } from "./ExpenseCard";
import { TotalCard } from "./TotalCard";
import { AppHeader } from "@/components/AppHeader";

export const Evaluetions = () => {
  return (
    <View>
      <AppHeader />
      <View className="h-[150] w-full">
        <View className="bg-dark h-[50]" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="absolute pl-6 h-[141]"
        >
          <RevenueCard />
          <ExpenseCard />
          <TotalCard />
        </ScrollView>
      </View>
    </View>
  );
};
