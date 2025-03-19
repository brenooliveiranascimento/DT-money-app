import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <View className="flex-1">
      <Text>HOME</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;
