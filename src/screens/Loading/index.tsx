import { colors } from "@/styles/colors";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
  return (
    <SafeAreaView className="bg-dark items-center justify-center flex-1">
      <>
        <Image
          source={require("@/assets/images/Logo.png")}
          className="h-[48px] w-[255]"
        />
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  );
};

export default Loading;
