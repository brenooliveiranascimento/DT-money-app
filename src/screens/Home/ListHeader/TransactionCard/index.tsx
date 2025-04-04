import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useTransactionContext } from "@/context/transaction.context";
import { useMemo } from "react";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type TransactionCardProps = {
  type: TransactionTypes | "total";
  label: string;
  bgColor: string;
  amount: number;
};

const ICONS: Record<
  TransactionTypes | "total",
  keyof typeof MaterialIcons.glyphMap
> = {
  [TransactionTypes.EXPENSE]: "arrow-circle-down",
  [TransactionTypes.REVENUE]: "arrow-circle-up",
  total: "attach-money",
};

const COLORS: Record<TransactionTypes | "total", string> = {
  [TransactionTypes.EXPENSE]: colors["accent-red"],
  [TransactionTypes.REVENUE]: colors["accent-brand-light"],
  total: colors.white,
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  label,
  bgColor,
  amount,
}) => {
  const { transactions, filters } = useTransactionContext();

  const lastTransaction = useMemo(() => {
    return transactions.find(({ type: t }) => t.id === type);
  }, [transactions]);

  const renderDateInfo = () => {
    if (lastTransaction) {
      return (
        <Text className="text-gray-700 text-base">
          {format(
            lastTransaction.createdAt,
            `'Última ${
              type === TransactionTypes.EXPENSE ? "saída" : "entrada"
            } em' d 'de' MMMM`,
            { locale: ptBR }
          )}
        </Text>
      );
    }

    if (type === "total") {
      return (
        <Text className="text-white text-base">
          {filters.from && filters.to
            ? `${format(filters.from, "d MMMM", { locale: ptBR })} até ${format(
                filters.to,
                "d MMMM",
                { locale: ptBR }
              )}`
            : "Todo período"}
        </Text>
      );
    }

    return (
      <Text className="text-gray-700 text-base">
        Sem movimentações encontradas
      </Text>
    );
  };

  return (
    <View
      className={`bg-${bgColor} min-w-[280] rounded-[6] px-8 py-6 mr-6 justify-between`}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base ">{label}</Text>
        <MaterialIcons name={ICONS[type]} color={COLORS[type]} size={26} />
      </View>
      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
        {renderDateInfo()}
      </View>
    </View>
  );
};
