import { useAuthContext } from "@/context/auth.context";
import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/styles/colors";
import { FC, useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  setLoading: (value: boolean) => void;
}

const Loading: FC<Props> = ({ setLoading }) => {
  const { restoreUserSession, handleLogout } = useAuthContext();
  const { fetchCategories } = useTransactionContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [user] = await Promise.all([
          restoreUserSession(),
          fetchCategories(),
        ]);
        if (!user) {
          handleLogout();
        }
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-dark items-center justify-center flex-1">
      <>
        <Image
          source={require("@/assets/images/Logo.png")}
          className="h-[48px] w-[255]"
        />
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  );
};

export default Loading;
