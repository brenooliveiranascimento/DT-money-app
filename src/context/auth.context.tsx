import { FormLogin } from "@/screens/Login/Form";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
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
  handleAuthenticate: (params: FormLogin) => Promise<void>;
  handleRegister: (params: FormRegister) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
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
    const { token, user } = await authApi.registerUser(formData);
    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );
    setToken(token);
    setUser(user);
  };

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { token, user } = JSON.parse(userData) as IAuthenticateResponse;
      setToken(token);
      setUser(user);
    }
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
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
