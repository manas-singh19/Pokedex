import React, { ReactNode, memo } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: ReactNode;
  scrollEnabled?: boolean;
}

// A wrapper component to handle safe areas, keyboard dismissal, and scrolling
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, scrollEnabled = true}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
          {/* <ScrollView contentContainerStyle={styles.scrollContent}>
            {children}
          </ScrollView>
           */}

            {/* {scrollEnabled ? (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                {children}
                </ScrollView>
            ) : (
                <>{children}</> // Directly render children without ScrollView
            )} */}
            <>
              {children}
            </> 
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#fff", // Replace with theme or preferred color
  },
  container: {
    flex: 1, 
     
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default memo(ScreenWrapper);
