import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { FC, useState } from "react";
import { useTransactionContext } from "@/context/transaction.context";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { useErrorHandler } from "@/shared/hooks/errorHandler";

interface Props {
  transaction: Transaction;
}

export const RightAction: FC<Props> = ({ transaction }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleDelete } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const deleteTransaction = async () => {
    setLoading(true);
    try {
      await handleDelete(transaction.id);
    } catch (error) {
      handleError(error, "Falha ao deletar transação");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        className="h-[140] bg-accent-red-dark w-[80] rounded-r-[6] items-center justify-center"
        onPress={showModal}
        activeOpacity={0.8}
      >
        <MaterialIcons name="delete-outline" color={colors.white} size={30} />
      </TouchableOpacity>

      {modalVisible && (
        <View className="flex-1 absolute">
          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={hideModal}
          >
            <TouchableWithoutFeedback onPress={hideModal}>
              <View className="flex-1 items-center justify-center bg-black/50">
                <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                  <View className="m-5 bg-gray-1000 rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322] z-9">
                    <View className="w-full content-between flex-row justify-between items-center border-b border-gray-300 pb-6">
                      <View className="flex-row fap-6 items-center">
                        <MaterialIcons
                          size={25}
                          name="error-outline"
                          className="mr-4"
                          color={colors.gray["400"]}
                        />
                        <Text className="text-white text-xl">
                          Apagar transação?
                        </Text>
                      </View>
                      <TouchableOpacity onPress={hideModal}>
                        <MaterialIcons
                          name="close"
                          color={colors.gray["800"]}
                          size={25}
                        />
                      </TouchableOpacity>
                    </View>

                    <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                      <Text className="text-gray-500 text-lg leading-8">
                        Tem certeza de que deseja apagar esta transação? Esta
                        ação não pode ser desfeita.
                      </Text>
                    </View>

                    <View className="flex-row justify-end gap-4 p-6 pb-0 w-full items-end pr-0">
                      <TouchableOpacity
                        onPress={hideModal}
                        className="w-[100] bg-none border-2 border-green items-center justify-center p-3 rounded-[6]"
                      >
                        <Text className="text-green">Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={deleteTransaction}
                        className="w-[100] bg-accent-red-dark items-center justify-center p-3 rounded-[6]"
                      >
                        {loading ? (
                          <ActivityIndicator />
                        ) : (
                          <Text className="text-white">Apagar</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
    </>
  );
};
