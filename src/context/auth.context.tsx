import { FormLogin } from "@/screens/Login/Form";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import * as authApi from "@/shared/services/dt-money/auth.service";
import { User } from "@/shared/interfaces/user-interface";
import { FormRegister } from "@/screens/Register/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticateResponse } from "@/shared/interfaces/https/autehnticate-response";

type AuthContextType = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  handleAuthenticate: (params: FormLogin) => Promise<void>;
  handleRegister: (params: FormRegister) => Promise<void>;
  handleLogout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshToken, setRefreshToken] = useState(null);

  const handleLogout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("dt-money-user");
  };

  const handleAuthenticate = async ({ email, password }: FormLogin) => {
    const { token, user } = await authApi.authenticate({ email, password });
    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );
    setToken(token);
    setUser(user);
  };

  const handleRegister = async (formData: FormRegister) => {
    const response = await authApi.registerUser(formData);
    setToken(response.token);
    setUser(response.user);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const userData = await AsyncStorage.getItem("dt-money-user");
        if (userData) {
          const { token, user } = JSON.parse(userData) as IAuthenticateResponse;
          setToken(token);
          setUser(user);
        }
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshToken,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
