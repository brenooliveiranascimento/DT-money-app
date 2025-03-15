import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./PublicRoutes";

const NavigatorRoutes = () => {
  return (
    <NavigationContainer>
      <PublicRoutes />
    </NavigationContainer>
  );
};

export default NavigatorRoutes;
