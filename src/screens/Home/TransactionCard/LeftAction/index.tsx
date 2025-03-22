import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const LeftAction = () => {
  return (
    <TouchableOpacity
      className="h-[140] bg-accent-blue-dark w-[80] rounded-l-[6] items-center justify-center"
      onPress={() => {}}
      activeOpacity={0.8}
    >
      <MaterialIcons color={colors.white} name="edit" size={30} />
    </TouchableOpacity>
  );
};
