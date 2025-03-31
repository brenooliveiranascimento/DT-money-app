import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/styles/colors";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export const TranscationCategoriesList = () => {
  const { categories, filters, handleCategoryFilter } = useTransactionContext();

  const handleChangeCategory = (categoryId: number) => {
    handleCategoryFilter(categoryId);
  };

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-4 text-gray-700">
        Categorias
      </Text>
      {categories.map(({ id, name }) => (
        <TouchableOpacity
          onPress={() => handleChangeCategory(id)}
          key={`categorie-${id}`}
          className="flex-row items-center py-2"
        >
          <Checkbox
            value={Boolean(filters.categoryIds[id]) || false}
            onValueChange={() => handleChangeCategory(id)}
            color={
              filters.categoryIds[id] ? colors["accent-brand-light"] : undefined
            }
            className="mr-4"
          />
          <Text className="text-lg text-white">{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
