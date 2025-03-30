import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction } from "@/shared/interfaces/transaction-interface";
import { FC, useState } from "react";
import { colors } from "@/styles/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { useTransactionContext } from "@/context/transaction.context";
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-params";
import { transactionSchema } from "./schema";
import * as Yup from "yup";
import { ErrorMessage } from "@/components/ErrorMessage";
import SelectModal from "@/components/SelectCategory";
import TransactionTypeSelector from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import CurrencyInput from "react-native-currency-input";

interface Props {
  transactionToUpdate: Transaction;
}

export const EditTransactionBottomsheet: FC<Props> = ({
  transactionToUpdate,
}) => {
  const { handleError } = useErrorHandler();
  const [loading, setLoading] = useState(false);

  const { updateTransaction } = useTransactionContext();
  const { closeBottomSheet } = useBottomSheetContext();

  const [validationErrors, setValidationErrors] =
    useState<Record<keyof UpdateTransactionInterface, string>>();

  const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
    categoryId: transactionToUpdate.categoryId,
    id: transactionToUpdate.id,
    typeId: transactionToUpdate.typeId,
    value: transactionToUpdate.value,
    description: transactionToUpdate.description,
  });

  const setType = (typeId: number) =>
    setTransaction((prev) => ({ ...prev, typeId }));

  const setCategory = (categoryId: number) =>
    setTransaction((prev) => ({ ...prev, categoryId }));

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

      await updateTransaction(transaction);

      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as Record<keyof UpdateTransactionInterface, string>;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionInterface] = err.message;
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
            {loading ? <ActivityIndicator /> : "Atualizar"}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
