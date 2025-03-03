import React,{memo} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 

import { useTheme } from '../../theme/themeProviderProps'; // Ensure this is correctly typed
import { useNavigation } from '@react-navigation/native';
 
import AppIcons from '../../utility/icons';


interface HeaderProps {
  title: string;
  back?: boolean; 
  color:string,
  normal:boolean
}

const HeaderBack: React.FC<HeaderProps> = ({ title, back, color, normal}) => {
    const theme = useTheme();   
    const {toggleTheme} = useTheme();
    const navigation = useNavigation();

  return (
    <View style={[styles.container,
    !normal?{backgroundColor:color}:{backgroundColor:theme.theme.isDark?'#000':'#fff'}
    
    ]}>
      <View style={{
            width: '60%',
            height: 40,
            //backgroundColor: theme.theme.colors.background,
            flexDirection:'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent:'center', 
      }}>
        <TouchableOpacity style={{flexDirection:'row', alignContent:'center', alignItems:'center'}} onPress={()=>{navigation.goBack()}}>
            {
              theme.theme.isDark?<AppIcons.Back width={18} fill="black" />:<AppIcons.BackBlack width={18} fill="black" />
            }  
            {
              normal&&( 
                <Text style={{
                    color:theme.theme.isDark?'#fff':'#000',
                    fontSize:theme.theme.fonts.b2,
                    fontWeight:theme.theme.fontWeights.bold,
                    marginLeft:4
                }}>{title}</Text>
              )
            }
        </TouchableOpacity>
        
      </View>
      <View style={{
        width: '40%',
        height: 40, 
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent:'center'
      }}>
         
      </View>
    </View>
  );
};

export default memo(HeaderBack);

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
 