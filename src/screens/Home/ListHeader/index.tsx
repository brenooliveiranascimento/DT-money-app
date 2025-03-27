import { ScrollView, View } from "react-native";
import { ExpenseCard } from "./ExpenseCard";
import { TotalCard } from "./TotalCard";
import { AppHeader } from "@/components/AppHeader";
import { RevenueCard } from "./RevenueCard";

export const ListHeader = () => {
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
