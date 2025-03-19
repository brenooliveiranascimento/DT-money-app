import { dtMoneyApi } from "@/shared/api/dt-money";
import { IAuthenticateResponse } from "@/shared/interfaces/https/autehnticate-response";
import { FormLogin } from "@/screens/Login/Form";
import { FormRegister } from "@/screens/Register/Form";

export const authenticate = async (
  userData: FormLogin
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData
  );
  return data;
};

export const registerUser = async (
  userData: FormRegister
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/register",
    userData
  );
  return data;
};
