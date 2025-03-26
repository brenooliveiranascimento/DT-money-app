import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import SelectModal from "@/components/SelectCategory";
import { useState } from "react";
import TransactionTypeSelector from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import { TransactionCategory } from "@/shared/interfaces/transaction-categoty.interface";

export const NewTransaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<TransactionCategory | null>(null);
  const [type, setType] = useState<number | null>(null);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const createTransaction = () => {
    
  }

  return (
    <View className="px-8 py-5">
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">Editar transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray["700"]} />
      </View>
      <View className="flex-1 mt-8 mb-8">
        <TextInput
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray["700"]}
        />
        <TextInput
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4"
          placeholder="Preço"
          placeholderTextColor={colors.gray["700"]}
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={openModal}
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4 justify-center"
        >
          <Text
            className={`${category ? "text-white" : "text-gray-700"} text-lg`}
          >
            {category ? category.name : "Categoria"}
          </Text>
        </TouchableOpacity>

        <TransactionTypeSelector typeId={type} setTransactionType={setType} />

        <View className="my-4">
          <AppButton onPress={() => {}}>Registrar</AppButton>
        </View>
      </View>

      <SelectModal
        onClose={closeModal}
        visible={showModal}
        onSelect={setCategory}
        selectedItem={category}
      />
    </View>
  );
};
