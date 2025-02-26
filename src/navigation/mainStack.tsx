import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, View, StyleSheet } from "react-native";
import { useTheme } from "../theme/themeProviderProps";

import HomeScreen from "../screens/home";
import DetailsScreen from "../screens/details";

const Stack = createNativeStackNavigator();

import { enableScreens } from "react-native-screens";
 
enableScreens();

export function MainStack() {
  const theme = useTheme(); // Assuming `useTheme` provides theme colors dynamically

  return (
    <View style={[styles.container]}>
      
      {/* <StatusBar barStyle={theme.theme.isDark?"dark-content":'light-content'} backgroundColor={theme.theme.isDark?"#000000":'#ffffff'} /> */}
      
      {/* Navigation Stack */}
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
         contentStyle: { backgroundColor: theme.theme.colors.background}, // Set screen background color 
        }}
      >

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ 
            statusBarStyle: "dark", // "light" or "dark"  
            statusBarBackgroundColor: '#000', // Set status bar color
          }}
        /> 

        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ 
            statusBarStyle: "dark", // "light" or "dark"  
            statusBarBackgroundColor: '#000', // Set status bar color
          }}
        />
  
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View takes the entire screen
  },
});
