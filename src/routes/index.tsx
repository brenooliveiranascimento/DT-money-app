import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./PublicRoutes";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { PrivateRoutes } from "./PrivateRoutes";
import Loading from "../screens/Loading";

const NavigatorRoutes = () => {
  const { user, token, loading } = useContext(AuthContext);

  const Routes = useCallback(() => {
    if (loading) {
      return <Loading />;
    }
    if (token && user) {
      return <PrivateRoutes />;
    }
    return <PublicRoutes />;
  }, [user, token, loading]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default NavigatorRoutes;
