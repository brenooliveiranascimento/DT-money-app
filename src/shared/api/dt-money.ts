import axios from "axios";
import { AppError } from "../helpers/AppError";

export const dtMoneyApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_DT_MONEY_API_URL,
});

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError("Falha na requisição!"));
    }
  }
);
