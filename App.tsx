import NavigatorRoutes from "@/routes";
import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/styles/colors";
import { SnackBar } from "@/components/SnackBar";
import { SnackbarContextProvider } from "@/context/snackbacr.context";
import { AuthContextProvider } from "@/context/auth.context";
import { TransactionContextProvider } from "@/context/transaction.context";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <TransactionContextProvider>
          <NavigatorRoutes />
          <SnackBar />
          <StatusBar
            style="light"
            translucent={false}
            backgroundColor={colors.dark}
          />
        </TransactionContextProvider>
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
