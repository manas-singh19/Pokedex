import React from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity} from 'react-native';
 

import { useTheme } from '../../theme/themeProviderProps'; // Ensure this is correctly typed
 
import ScreenWrapper from '../../components/screenWrapper';

import AppIcons from '../../utility/icons'; 

const SplashScreen: React.FC = () => {
   
  const {theme } = useTheme(); 
  
  return (
    <View style={[styles.container,{ backgroundColor: theme.colors.background }]}>  
      <ScreenWrapper>
          <View style={styles.mainView}> 
              {theme.isDark == false ? 
                <AppIcons.PokedexDark width={240} fill="black" />
              :
                <AppIcons.Pokedex width={240}  fill="white" />
              }  
               
          </View>  
      </ScreenWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0, 
  },
  mainView:{
    width:'100%',
    height:'100%', 
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
  }
});

export default SplashScreen;
