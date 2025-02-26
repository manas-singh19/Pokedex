import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from './theme';

// Create a context for theme management
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: lightTheme, // Default to light theme
  toggleTheme: () => {},
});

// Define props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme(); // Detect system theme (light/dark)
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? darkTheme : lightTheme);

  // Load theme preference or use system theme
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');

      if (storedTheme === 'dark') {
        setTheme(darkTheme);
      } else if (storedTheme === 'light') {
        setTheme(lightTheme);
      } else {
        // No stored preference, use system theme
        setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
      }
    };

    loadTheme();
  }, [systemTheme]); // React to system theme changes

  // Function to toggle theme manually (for user control)
  const toggleTheme = async () => {
    const newTheme = theme.isDark ? lightTheme : darkTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme.isDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme
export const useTheme = () => useContext(ThemeContext);