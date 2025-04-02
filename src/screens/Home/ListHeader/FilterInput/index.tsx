import { useTransactionContext } from "@/context/transaction.context";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import FiltroTransacoes from "./FilterTransactionBottomSheet";

export const FilterInput = () => {
  const { searchFilter, setSearchFilter, transactions, fetchTransactions } =
    useTransactionContext();

  const { openBottomSheet } = useBottomSheetContext();
  const inputRef = useRef<TextInput>(null);

  const [text, setText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchFilter(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    fetchTransactions({ page: 1 });
  }, [searchFilter]);

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold mt-4 mb-3">
          Transações
        </Text>
        <Text className="text-gray-700 text-base mt-4 mb-3">
          {transactions.length} {transactions.length === 1 ? "Item" : "itens"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => inputRef.current?.focus()}
        activeOpacity={1}
        className={`flex-row items-center justify-between h-16`}
      >
        <TextInput
          className="h-[50] text-white w-full bg-dark text-lg pl-4"
          value={text}
          onChangeText={setText}
          placeholderTextColor={colors.gray["600"]}
          ref={inputRef}
          placeholder="Busque uma transação"
        />
        <TouchableOpacity
          onPress={() => openBottomSheet(<FiltroTransacoes />)}
          className="absolute right-0"
        >
          <MaterialIcons
            name="filter-list"
            color={colors["accent-brand-light"]}
            size={26}
            className="mr-3"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
