import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/styles/colors";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { TranscationCategoriesList } from "./TransactionCategoriesList";
import { TransactionTypesList } from "./TransactionTypesList";
import { TransactionDate } from "./TransactionDate";

const FiltroTransacoes = () => {
  const { fetchTransactions, resetFilter } = useTransactionContext();
  const { close } = useBottomSheet();
  const { handleError } = useErrorHandler();
  const getTranscations = async () => {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao aplicar filtros");
    } finally {
      close();
    }
  };

  const handleResetFilter = () => {
    resetFilter();
    close();
  };

  return (
    <View className="flex-1 bg-gray[1000] p-6">
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold mb-5 text-white">
          Filtrar transações
        </Text>
        <MaterialIcons name="close" color={colors.gray["600"]} size={20} />
      </View>

      <TransactionDate />

      <TranscationCategoriesList />

      <TransactionTypesList />

      <View className="flex-row w-full gap-4 mb-4 mt-8">
        <TouchableOpacity
          onPress={handleResetFilter}
          className=" border-accent-brand bg-none border-2 py-4 rounded-[8] items-center flex-1"
        >
          <Text className="text-accent-brand font-medium text-lg">
            Limpar Filtros
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={getTranscations}
          className="bg-accent-brand border-none py-4 rounded-[8] items-center flex-1"
        >
          <Text className="text-white font-medium text-lg">Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FiltroTransacoes;
