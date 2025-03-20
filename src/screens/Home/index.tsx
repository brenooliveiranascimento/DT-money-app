import { AppHeader } from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionsList from "./TransactionsList";
import { Evaluetions } from "./Evaluetions";
import { ScrollView } from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-1000">
      <AppHeader />
      <ScrollView bounces={false}>
        <Evaluetions />
        <TransactionsList />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
