import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NewTransaction } from "./NewTransaction";

export const AppHeader = () => {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <View className="w-full p-8 flex-row justify-between items-center bg-dark">
      <Image
        source={require("@/assets/images/Logo.png")}
        className="w-[155px] h-[30px]"
      />
      <TouchableOpacity
        onPress={() => openBottomSheet(<NewTransaction />)}
        className="bg-green w-[130] items-center justify-center p-4 rounded-xl"
      >
        <Text className="text-white font-bold text-sm">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
};
