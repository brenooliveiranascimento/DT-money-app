import { useSnackbarContext } from "@/context/snackbacr.context";
import { Text, View } from "react-native";

export const SnackBar = () => {
  const { message, type } = useSnackbarContext();

  if (!message || !type) {
    return <></>;
  }

  const bgColor = `${
    type === "SUCCESS" ? "bg-accent-brand-dark" : "bg-accent-red-dark"
  }`;

  return (
    <View
      className={`absolute bottom-10 self-center w-[90%] ${bgColor} h-[50px] rounded-xl p-2 justify-center`}
    >
      <Text className="text-white text-base font-bold">{message}</Text>
    </View>
  );
};
