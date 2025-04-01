import NavigatorRoutes from "@/routes";
import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/styles/colors";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { AuthContextProvider } from "@/context/auth.context";
import { TransactionContextProvider } from "@/context/transaction.context";
import { BottomSheetProvider } from "@/context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SnackBar } from "@/components/SnackBar";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigatorRoutes />
              <StatusBar
                style="light"
                translucent={false}
                backgroundColor={colors.dark}
              />
              <SnackBar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
