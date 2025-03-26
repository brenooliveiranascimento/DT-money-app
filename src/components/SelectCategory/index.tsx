import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import Checkbox from "expo-checkbox";
import { TransactionCategory } from "@/shared/interfaces/transaction-categoty.interface";
import { colors } from "@/styles/colors";

interface Item {
  id: number;
  name: string;
}

interface SelectModalProps {
  visible: boolean;
  onClose: () => void;
  selectedItem: TransactionCategory | null;
  onSelect: (itemId: TransactionCategory) => void;
}

const items: Item[] = [
  { id: 0, name: "Item 1" },
  { id: 1, name: "Item 2" },
  { id: 2, name: "Item 3" },
];

export default function SelectModal({
  visible,
  onClose,
  selectedItem,
  onSelect,
}: SelectModalProps) {
  const [selected, setSelected] = useState<TransactionCategory | null>(
    selectedItem || null
  );

  useEffect(() => {
    setSelected(selectedItem || null);
  }, [selectedItem]);

  const handleSelect = (itemId: TransactionCategory) => {
    setSelected(itemId);
    onSelect(itemId);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-[#202024] p-4 rounded-lg w-80">
          <Text className="text-white text-lg mb-4">Selecione um item</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className="flex-row items-center bg-gray-800 p-2 rounded-lg mb-2"
              >
                <Checkbox
                  value={selected?.id === item.id}
                  onValueChange={() => handleSelect(item)}
                  color={
                    selected?.id === item.id
                      ? colors["accent-brand-light"]
                      : undefined
                  }
                  className="mr-2"
                />
                <Text className="text-white text-center">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
