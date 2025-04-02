import { FC, PropsWithChildren } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const DismissKeyboardView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <ScrollView>{children}</ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default DismissKeyboardView;
