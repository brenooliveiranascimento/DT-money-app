import { Image, Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../AppButton";

export const AppHeader = () => {
  return (
    <View className="w-full p-8 flex-row justify-between items-center bg-dark">
      <Image
        source={require("@/assets/images/Logo.png")}
        className="w-[155px] h-[30px]"
      />
      <TouchableOpacity className="bg-green w-[150px] items-center justify-center p-4 rounded-xl">
        <Text className="text-white font-bold text-base">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
};
