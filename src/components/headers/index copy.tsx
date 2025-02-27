import React,{memo} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 

import { useTheme } from '../../theme/themeProviderProps'; // Ensure this is correctly typed
import AppIcons from '../../utility/icons';
 


interface HeaderProps {
  title: string;
  isIcon?: boolean;
  iconsType?: string[];
  filterOpen:()=>void;
  filterClose:()=>void;
}

const Header: React.FC<HeaderProps> = ({ title, isIcon, iconsType,filterOpen,filterClose }) => {
    const theme = useTheme();   
    const {toggleTheme} = useTheme();
  return (
    <View style={[styles.container,{
        backgroundColor:theme.theme.colors.background,
    }]}>
      <View style={{
            width: '40%',
            height: 40,
            backgroundColor: theme.theme.colors.background,
            flexDirection:'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent:'center'
      }}>
        <Text style={{
            color:theme.theme.isDark?'white':'black',
            fontSize:theme.theme.fonts.b1,
            fontWeight:theme.theme.fontWeights.bold
        }}>{title}</Text>
      </View>
      <View style={{
        width: '60%',
        height: 40, 
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent:'center'
      }}>
        {isIcon &&
          iconsType?.map((icon, index) => (
            icon == 'switch' ? (
              <TouchableOpacity key={`sort-${index}`} onPress={toggleTheme} style={{marginRight:6}}> 
                {theme.theme.isDark ? (
                  <AppIcons.ThemeWhite width={19} fill="black" /> 
                ) : (
                  <AppIcons.ThemeDark width={19} fill="black" /> 
                )}
             </TouchableOpacity>  
            ) : icon == 'sort' ? (
              <TouchableOpacity key={`sort-${index}`} onPress={toggleTheme}> 
                {theme.theme.isDark ? (
                  <AppIcons.SortWhite width={30} fill="black" /> 
                ) : (
                  <AppIcons.Sort width={30} fill="black" /> 
                )}
              </TouchableOpacity>  
            ) : 
            icon == 'filter'?( 
              <TouchableOpacity key={`filter-${index}`} onPress={filterOpen}> 
              {theme.theme.isDark ? (
                <AppIcons.FilterWhite width={30} fill="black" /> 
              ) : (
                <AppIcons.Filter width={30} fill="black" /> 
              )}
            </TouchableOpacity>  
            ):null
          ))}
          
      </View>
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
   
});
 