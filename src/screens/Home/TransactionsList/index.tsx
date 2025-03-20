import { AuthContext } from "@/context/auth.context";
import { SnackbarContext } from "@/context/snackbacr.context";
import { AppError } from "@/shared/helpers/AppError";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

const TransactionsList = () => {
  const { handleLogout } = useContext(AuthContext);
  const { notify } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(15);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const params = {
          page,
          perPage,
          totalPage,
        };
      } catch (error) {
        if (error instanceof AppError) {
          notify({
            message: error.message,
            messageType: "ERROR",
          });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [page, setPage, totalPage, perPage, loading]);

  return <View></View>;
};

export default TransactionsList;
