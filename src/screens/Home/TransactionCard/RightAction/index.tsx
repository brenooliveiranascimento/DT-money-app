import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export const RightAction = () => {
  return (
    <TouchableOpacity
      className="h-[140] bg-accent-red-dark w-[80] rounded-r-[6] items-center justify-center"
      onPress={() => {}}
      activeOpacity={0.8}
    >
      <MaterialIcons name="delete-outline" color={colors.white} size={30} />
    </TouchableOpacity>
  );
};
