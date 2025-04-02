import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
} from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View, TouchableWithoutFeedback } from "react-native";
import { colors } from "@/styles/colors";

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode) => void;
  closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = useCallback((newContent: React.ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
    requestAnimationFrame(() => {
      bottomSheetRef.current?.expand();
    });
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsOpen(false);
    setContent(null);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}

      {isOpen && (
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-1" />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        onChange={handleSheetChanges}
        index={-1}
        backgroundStyle={{
          backgroundColor: colors.gray["1000"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
        style={{ zIndex: 2 }}
      >
        <BottomSheetScrollView className="flex-1 bg-gray-1000 min-h-[400]">
          {content}
        </BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  return useContext(BottomSheetContext);
};
