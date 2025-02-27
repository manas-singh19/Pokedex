import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/themeProviderProps';
import AppIcons from '../../utility/icons';

interface HeaderProps {
  title: string;
  isIcon?: boolean;
  iconsType?: string[];
  filterOpen: () => void;
  
}

const Header: React.FC<HeaderProps> = ({ title, isIcon, iconsType, filterOpen}) => {
  const theme = useTheme();
  const { toggleTheme } = theme; // Removed duplicate `useTheme()`

  // Memoize icon rendering to prevent unnecessary re-renders
  const renderIcons = useMemo(() => {
    if (!isIcon || !iconsType) return null;
    
    return iconsType.map((icon, index) => {
      let IconComponent = null;
      let onPressHandler = () => {};

      switch (icon) {
        case 'switch':
          IconComponent = theme.theme.isDark ? <AppIcons.ThemeWhite width={19} fill="black" /> : <AppIcons.ThemeDark width={19} fill="black" />;
          onPressHandler = toggleTheme;
          break;
        case 'sort':
          IconComponent = theme.theme.isDark ? <AppIcons.SortWhite width={30} fill="black" /> : <AppIcons.Sort width={30} fill="black" />;
          break;
        case 'filter':
          IconComponent = theme.theme.isDark ? <AppIcons.FilterWhite width={30} fill="black" /> : <AppIcons.Filter width={30} fill="black" />;
          onPressHandler = filterOpen;
          break;
        default:
          return null;
      }

      return (
        <TouchableOpacity key={`${icon}-${index}`} onPress={onPressHandler} style={styles.iconButton}>
          {IconComponent}
        </TouchableOpacity>
      );
    });
  }, [isIcon, iconsType, theme.theme.isDark, toggleTheme, filterOpen]);

  return (
    <View style={[styles.container, { backgroundColor: theme.theme.colors.background }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: theme.theme.isDark ? 'white' : 'black', fontSize: theme.theme.fonts.b1 }]}>
          {title}
        </Text>
      </View>
      <View style={styles.iconContainer}>{renderIcons}</View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titleContainer: {
    width: '40%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    width: '60%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 6,
  },
});