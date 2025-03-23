import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useState } from "react";
import { AppButton } from "@/components/AppButton";

export const RightAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
                  <View className="p-5 flex-1 border-b border-gray-300">
                    <Text className="text-gray-500 text-lg leading-8">
                      Tem certeza de que deseja apagar esta transação? Esta ação
                      não pode ser desfeita.
                    </Text>
                  </View>

                  <View className="flex-row">
                    <AppButton onPress={() => {}}>TESTE</AppButton>
                    <TouchableOpacity>
                      <Text>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text>Apagar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </>
  );
};
