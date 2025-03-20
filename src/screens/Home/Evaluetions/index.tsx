import { ScrollView, Text, View } from "react-native";
import { RevenueCard } from "./RevenueCard";

export const Evaluetions = () => {
  return (
    <View className="bg-black h-[80]">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        className="min-h-[150] mt-[10] absolute w-full"
      >
        <RevenueCard />
      </ScrollView>
    </View>
  );
};
