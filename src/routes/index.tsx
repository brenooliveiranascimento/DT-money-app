import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./PublicRoutes";
import { useCallback, useState } from "react";
import { useAuthContext } from "@/context/auth.context";
import { PrivateRoutes } from "./PrivateRoutes";
import Loading from "../screens/Loading";

const NavigatorRoutes = () => {
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />;
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
