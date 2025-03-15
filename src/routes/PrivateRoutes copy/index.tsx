import { createStackNavigator } from "@react-navigation/stack";
import Register from "@/screens/Register";

export type PrivateStackParamsList = {
  Home: undefined;
};

export const PrivateRoutes = () => {
  const PrivateStack = createStackNavigator<PrivateStackParamsList>();

  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Home" component={Register} />
    </PrivateStack.Navigator>
  );
};
