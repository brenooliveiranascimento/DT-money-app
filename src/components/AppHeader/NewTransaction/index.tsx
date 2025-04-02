import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import SelectModal from "@/components/SelectCategory";
import { useState } from "react";
import TransactionTypeSelector from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useTransactionContext } from "@/context/transaction.context";
import { transactionSchema } from "./schema";
import * as Yup from "yup";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-params";
import CurrencyInput from "react-native-currency-input";

export const NewTransaction = () => {
  const { handleError } = useErrorHandler();
  const [loading, setLoading] = useState(false);

  const { createTransaction } = useTransactionContext();
  const { closeBottomSheet } = useBottomSheetContext();

  const [validationErrors, setValidationErrors] =
    useState<Record<keyof CreateTransactionInterface, string>>();

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    typeId: 0,
    value: 0,
    description: "",
    categoryId: 0,
  });

  const setType = (typeId: number) =>
    setTransaction((prev) => ({ ...prev, typeId }));

  const setCategory = (categoryId: number) =>
    setTransaction((prev) => ({ ...prev, categoryId }));

  const setDescription = (description: string) =>
    setTransaction((prev) => ({ ...prev, description }));

  const setValue = (value: number) => {
    setTransaction((prev) => ({
      ...prev,
      value,
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

      await createTransaction(transaction);

      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as Record<keyof CreateTransactionInterface, string>;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionInterface] = err.message;
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
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray["700"]} />
      </View>
      <View className="flex-1 mt-8 mb-8">
        <TextInput
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray["700"]}
          value={transaction.description}
          onChangeText={setDescription}
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          onChangeValue={setValue}
          prefix="R$ "
          delimiter="."
          separator=","
          placeholder="RS"
          placeholderTextColor={colors.gray["700"]}
          precision={2}
          minValue={0}
          className="text-white text-lg h-[50] bg-dark my-2 rounded-[6] pl-4"
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}
        <SelectModal
          onSelect={setCategory}
          selectedCategory={transaction.categoryId}
        />
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
    </View>
  );
};
