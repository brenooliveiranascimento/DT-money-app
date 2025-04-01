import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NewTransaction } from "./NewTransaction";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useAuthContext } from "@/context/auth.context";

export const AppHeader = () => {
  const { openBottomSheet } = useBottomSheetContext();
  const { handleLogout } = useAuthContext();

  return (
    <View className="w-full p-8 flex-row justify-between items-center bg-dark">
      <View>
        <Image
          source={require("@/assets/images/Logo.png")}
          className="w-[130px] h-[30px]"
        />
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-2 mt-2"
        >
          <MaterialIcons name="logout" color={colors.gray["700"]} size={15} />
          <Text className="text-gray-700 text-base ">Sair da conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => openBottomSheet(<NewTransaction />)}
        className="bg-green w-[130] items-center justify-center rounded-xl h-[50]"
      >
        <Text className="text-white font-bold text-sm">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
};
