import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'; 

import { useTheme } from './src/theme/themeProviderProps';

const App = () => {
  const { theme, toggleTheme } = useTheme();

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