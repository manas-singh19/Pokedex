import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, View, StyleSheet } from "react-native";
import { useTheme } from "../theme/themeProviderProps";
 
import HomeScreen from "../screens/home";

const Stack = createStackNavigator();

export function MainStack() {
  const theme = useTheme(); // Assuming `useTheme` provides theme colors dynamically

  return (
    <View style={[styles.container]}>
      {/* Navigation Stack */}
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.theme.colors.background, paddingHorizontal:theme.theme.spacing.lg }, // Set screen background color 
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen} 
          options={{ 
            statusBarStyle: "dark", // "light" or "dark"  
          }}
        />

      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View takes the entire screen,
    backgroundColor:"#fff"
  },
});