import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import SelectModal from "@/components/SelectCategory";
import { useEffect, useState } from "react";
import TransactionTypeSelector from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import { TransactionCategory } from "@/shared/interfaces/transaction-categoty.interface";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useTransactionContext } from "@/context/transaction.context";
import { transactionSchema } from "./schema";
import * as Yup from "yup";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { mask, unMask } from "react-native-mask-text";

interface TransactionInterface {
  typeId: number;
  value: number;
  description: string;
  categoryId: number;
}

export const NewTransaction = () => {
  const [showModal, setShowModal] = useState(false);
  const { handleError } = useErrorHandler();
  const [loading, setLoading] = useState(false);
  const { createTransaction } = useTransactionContext();
  const { closeBottomSheet } = useBottomSheetContext();

  const [validationErrors, setValidationErrors] =
    useState<Record<keyof TransactionInterface, string>>();
  console.log({ validationErrors });
  const [displayValue, setDisplayValue] = useState("");

  const [transaction, setTransaction] = useState<TransactionInterface>({
    typeId: 0,
    value: 0,
    description: "",
    categoryId: 0,
  });

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const setType = (typeId: number) =>
    setTransaction((prev) => ({ ...prev, typeId }));

  const setCategory = (categoryId: number) =>
    setTransaction((prev) => ({ ...prev, categoryId }));

  const handleChangeValue = (value: string) => {
    const [_, number] = value.split("R$");

    if (isNaN(Number(number))) return;

    setTransaction((prev) => ({
      ...prev,
      value: Number(number),
    }));
  };

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);
      setValidationErrors(undefined);
      const { typeId, value, categoryId, description } = transaction;

      await transactionSchema.validate(
        {
          value,
          categoryId,
          description,
          typeId,
        },
        { abortEarly: false }
      );

      await createTransaction({
        categoryId,
        typeId: transaction.typeId,
        value: transaction.value,
      });

      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as Record<keyof TransactionInterface, string>;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof TransactionInterface] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        handleError(error, "Falha ao criar transação");
      }
    } finally {
      setLoading(false);
    }
  };

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
          value={transaction.description}
          onChangeText={(text) =>
            setTransaction((prev) => ({ ...prev, description: text }))
          }
        />
        <TextInput
          keyboardType="numeric"
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4"
          value={mask(transaction.value.toString(), "R$ 999999999.99")}
          onChangeText={handleChangeValue}
          placeholder="R$ 0,00"
          placeholderTextColor={colors.gray["700"]}
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}
        <TouchableOpacity
          onPress={openModal}
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4 justify-center"
        >
          <Text
            className={`${
              transaction.categoryId ? "text-white" : "text-gray-700"
            } text-lg`}
          >
            {transaction.categoryId ?? "Categoria"}
          </Text>
        </TouchableOpacity>
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={setType}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}
        <View className="my-4">
          <AppButton onPress={handleCreateTransaction}>
            {loading ? <ActivityIndicator /> : "Registrar"}
          </AppButton>
        </View>
      </View>

      <SelectModal
        onClose={closeModal}
        visible={showModal}
        onSelect={(category) => setCategory(category)}
        selectedItem={transaction.categoryId}
      />
    </View>
  );
};
