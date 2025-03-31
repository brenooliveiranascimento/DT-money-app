import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/styles/colors";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { useErrorHandler } from "@/shared/hooks/errorHandler";
import { TranscationCategoriesList } from "./TransactionCategoriesList";
import { TransactionTypesList } from "./TransactionTypesList";
import { TransactionDate } from "./TransactionDate";

const FiltroTransacoes = () => {
  const [mostrarDatePickerFim, setMostrarDatePickerFim] = useState(false);
  const { handleFilter, filters, fetchTransactions, resetFilter } =
    useTransactionContext();
  const { close } = useBottomSheet();
  const getTranscations = async () => {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      useErrorHandler();
    } finally {
      close();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray[1000] px-2">
      <ScrollView className="p-4">
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
            onPress={resetFilter}
            className=" border-green bg-none border-2 py-4 rounded-[8] items-center flex-1"
          >
            <Text className="text-green font-medium text-lg">
              Limpar Filtros
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={getTranscations}
            className="bg-green border-none py-4 rounded-[8] items-center flex-1"
          >
            <Text className="text-white font-medium text-lg">Filtrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FiltroTransacoes;
