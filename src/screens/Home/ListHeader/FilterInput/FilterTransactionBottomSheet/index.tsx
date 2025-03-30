import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTransactionContext } from "@/context/transaction.context";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { colors } from "@/styles/colors";
import { useBottomSheet } from "@gorhom/bottom-sheet";

const FiltroTransacoes = () => {
  const [mostrarDatePickerInicio, setMostrarDatePickerInicio] = useState(false);
  const [mostrarDatePickerFim, setMostrarDatePickerFim] = useState(false);
  const { categories, handleFilter, filters, fetchTransactions } =
    useTransactionContext();
  const { close } = useBottomSheet();
  const getTranscations = async () => {
    try {
      await fetchTransactions({ page: 1 });
      close();
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleCategoriaChange = (categoryId: number) => {
    // if (filters.categoryIds) {
    //   handleFilter({
    //     key: "categoryIds",
    //     value: {
    //       ...filters.categoryIds,
    //       [categoryId]: !Boolean(filters.categoryIds[categoryId]),
    //     },
    //   });
    // }
  };

  const handleTipoTransacaoChange = (transactionType: TransactionTypes) => {
    handleFilter({ key: "typeId", value: transactionType });
  };

  const onChangeDataInicio = (
    _: DateTimePickerEvent,
    daselectedDatete?: Date
  ) => {
    const currentDate = daselectedDatete || filters.from;
    if (!currentDate) return;
    setMostrarDatePickerInicio(false);
    handleFilter({ key: "from", value: currentDate });
  };

  const onChangeDataFim = (_: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || filters.to;
    if (!currentDate) return;
    setMostrarDatePickerFim(false);
    handleFilter({ key: "to", value: currentDate });
  };

  const formatarData = (data?: Date) => {
    if (!data) {
      return;
    }
    return `${data.getDate().toString().padStart(2, "0")}/${(
      data.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${data.getFullYear()}`;
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

        <Text className="text-gray-700 text-lg">Data</Text>

        <View className="flex-row justify-between mb-6">
          <View className="w-[48%]">
            <TouchableOpacity
              className="rounded-md p-2 bg-none border-b border-gray-800"
              onPress={() => setMostrarDatePickerInicio(true)}
            >
              <Text
                className={`text-lg ${
                  filters.from ? "text-white" : "text-gray-700"
                }`}
              >
                {filters.from ? formatarData(filters.from) : "De"}
              </Text>
            </TouchableOpacity>
            {mostrarDatePickerInicio && (
              <DateTimePicker
                value={filters.from ?? new Date()}
                mode="date"
                display="default"
                onChange={onChangeDataInicio}
              />
            )}
          </View>

          <View className="w-[48%]">
            <TouchableOpacity
              className="rounded-md p-2 bg-none border-b border-gray-800"
              onPress={() => setMostrarDatePickerFim(true)}
            >
              <Text
                className={`text-lg 
                 ${filters.from ? "text-white" : "text-gray-700"} 
                `}
              >
                {filters.to ? formatarData(filters.to) : "Até"}
              </Text>
            </TouchableOpacity>
            {mostrarDatePickerFim && (
              <DateTimePicker
                value={filters.to ?? new Date()}
                mode="date"
                display="default"
                onChange={onChangeDataFim}
              />
            )}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-base font-medium mb-4 text-gray-700">
            Categorias
          </Text>
          {categories.map(({ id, name }) => (
            <TouchableOpacity
              onPress={() => handleCategoriaChange(id)}
              key={`categorie-${id}`}
              className="flex-row items-center py-2"
            >
              <Checkbox
                value={filters.categoryIds[id] || false}
                onValueChange={() => handleCategoriaChange(id)}
                color={
                  filters.categoryIds[id]
                    ? colors["accent-brand-light"]
                    : undefined
                }
                className="mr-4"
              />
              <Text className="text-lg text-white">{name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-6">
          <Text className="text-lg font-medium mb-4 text-gray-700">
            Tipo de Transação
          </Text>
          <View className="flex-row items-center py-2">
            <Checkbox
              value={filters.typeId === TransactionTypes.EXPENSE}
              onValueChange={() =>
                handleTipoTransacaoChange(TransactionTypes.EXPENSE)
              }
              color={
                filters.typeId === TransactionTypes.EXPENSE
                  ? colors["accent-brand-light"]
                  : undefined
              }
              className="mr-4"
            />
            <Text className="text-lg text-white">Entrada</Text>
          </View>
          <View className="flex-row items-center py-2">
            <Checkbox
              value={filters.typeId === TransactionTypes.REVENUE}
              onValueChange={() =>
                handleTipoTransacaoChange(TransactionTypes.REVENUE)
              }
              color={
                filters.typeId === TransactionTypes.REVENUE
                  ? colors["accent-brand-light"]
                  : undefined
              }
              className="mr-4"
            />
            <Text className="text-lg text-white">Saída</Text>
          </View>
        </View>

        <View className="flex-row w-full gap-4 mb-4 mt-8">
          <TouchableOpacity className=" border-green bg-none border-2 py-4 rounded-[8] items-center flex-1">
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
