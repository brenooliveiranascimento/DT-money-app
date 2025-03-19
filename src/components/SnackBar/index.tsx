import { SnackbarContext } from "@/context/snackbacr.context";
import { useContext } from "react";
import { Text, View } from "react-native";

export const SnackBar = () => {
  const { message, type } = useContext(SnackbarContext);

  if (!message || !type) {
    return <></>;
  }

  const bgColor = `${type === "SUCCESS" ? "bg-primary" : "bg-warning"}`;

  return (
    <View
      className={`absolute bottom-10 self-center w-[90%] ${bgColor} h-[50px] rounded-xl p-2 justify-center`}
    >
      <Text className="text-white text-base font-bold">{message}</Text>
    </View>
  );
};
