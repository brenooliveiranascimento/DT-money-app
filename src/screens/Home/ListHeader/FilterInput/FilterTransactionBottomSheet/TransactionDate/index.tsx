import { useTransactionContext } from "@/context/transaction.context";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export const TransactionDate = () => {
  const { handleFilter, filters } = useTransactionContext();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onChangeStartDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || filters.from;
    if (!currentDate) return;
    setShowStartDatePicker(false);
    handleFilter({ key: "from", value: currentDate });
  };

  const onChangeEndDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || filters.to;
    if (!currentDate) return;
    setShowEndDatePicker(false);
    handleFilter({ key: "to", value: currentDate });
  };

  const formatDate = (date?: Date) => {
    if (!date || !isValid(date)) {
      return undefined;
    }
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <>
      <Text className="text-gray-700 text-lg">Data</Text>

      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md p-2 bg-none border-b border-gray-800"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text
              className={`text-lg ${
                filters.from ? "text-white" : "text-gray-700"
              }`}
            >
              {formatDate(filters.from) || "De"}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={filters.from ?? new Date()}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md p-2 bg-none border-b border-gray-800"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text
              className={`text-lg 
                ${filters.to ? "text-white" : "text-gray-700"} 
              `}
            >
              {formatDate(filters.to) || "Até"}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={filters.to ?? new Date()}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}
        </View>
      </View>
    </>
  );
};
