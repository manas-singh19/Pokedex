import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'; 

import { useTheme } from './src/theme/themeProviderProps';

import SplashScreen from './src/screens/splashScreen';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  // State to manage splash screen visibility
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // useEffect(() => {
  //   // Show the splash screen for 3 seconds
  //   const timer = setTimeout(() => setIsSplashVisible(false), 3000);

  //   // Cleanup the timer on component unmount
  //   return () => clearTimeout(timer);
  // }, []);

  // Render the splash screen if it's visible
  if (isSplashVisible) {
    return <SplashScreen />;
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.fonts.h1 }}>Pokedex</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );



};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});