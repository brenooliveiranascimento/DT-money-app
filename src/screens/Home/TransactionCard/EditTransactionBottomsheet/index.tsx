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

type ValidationErrorsTypes = Record<keyof UpdateTransactionInterface, string>;

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
    useState<ValidationErrorsTypes>();

  const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
    categoryId: transactionToUpdate.categoryId,
    id: transactionToUpdate.id,
    typeId: transactionToUpdate.typeId,
    value: transactionToUpdate.value,
    description: transactionToUpdate.description,
  });

  const setTransactionData = (
    key: keyof UpdateTransactionInterface,
    value: number | string | null
  ) => setTransaction((prev) => ({ ...prev, [key]: value }));

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
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionInterface] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        handleError(error, "Falha ao atualizar transação");
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
          className="text-white text-lg h-[50] bg-background-primary my-2 rounded-[6] pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray["700"]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData("description", text)}
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          onChangeValue={(value) => setTransactionData("value", value)}
          prefix="R$ "
          delimiter="."
          separator=","
          placeholder="RS"
          placeholderTextColor={colors.gray["700"]}
          precision={2}
          minValue={0}
          className="text-white text-lg h-[50] bg-background-primary my-2 rounded-[6] pl-4"
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}
        <SelectModal
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
          selectedCategory={transaction.categoryId}
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
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
