import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react';
import { BlurView } from '@react-native-community/blur';
import AppIcons from '../../utility/icons';
import { useTheme } from '../../theme/themeProviderProps';


 
interface FilterModalProps {
  model: boolean;
  setModalHandler: (value: boolean) => void;
  selectedFilter: (type: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ model, setModalHandler, selectedFilter }) => {
    const {theme} = useTheme(); 

  return (
    <Modal animationType="slide" transparent={true} visible={model}>
    <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
       {/* Blur Effect */}
      <BlurView 
        style={{ position: "absolute", width: "100%", height: "100%" }} 
        blurType={theme.isDark?'dark':'light'}  // Options: "light", "dark", "extraDark"
        blurAmount={12} 
        reducedTransparencyFallbackColor="black"
      />

      <TouchableOpacity style={{ backgroundColor:'transparent', width: '100%', height: "60%" }}  onPress={()=>setModalHandler(false)}>
        <View></View>
      </TouchableOpacity>  

      <View style={{ width: '100%', height: "40%", }}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity onPress={()=>setModalHandler(false)} style={{
            backgroundColor:theme.colors.background,
            width:'20%',
            height:10,
            borderRadius:33
          }}></TouchableOpacity>
        </View>

        <View style={[styles.filterContainer,{backgroundColor:theme.colors.background}]}>
            <Text style={{
              fontSize:theme.fonts.b1,
              fontWeight:theme.fontWeights.bold,
              color:theme.isDark?"#fff":"#000"
            }}>Filter</Text>
            <Text style={{
              fontSize:theme.fonts.b4,
              fontWeight:theme.fontWeights.normal,
              color:theme.isDark?"#fff":"#000"
            }}>Use advanced search to explore Pokémon by type, weakness, height and more!</Text>
            
            <Text style={{
              fontSize:theme.fonts.b3,
              fontWeight:theme.fontWeights.bold,
              marginVertical:9,
              marginTop:22,
              color:theme.isDark?"#fff":"#000"
            }}>Type</Text>

            <View style={{width:'100%', minHeight:90, flexWrap:'wrap', flexDirection:'row'}}>
             
              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('bug')}>
                <AppIcons.Bug width={25} fill="black"/> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('dark')}>
                <AppIcons.Dark width={25} fill="black"/> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('dragon')}>
                <AppIcons.Dragon width={25} fill="black"/> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('electric')}>
                <AppIcons.Electric width={25} fill="black"/> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('fairy')}>
                <AppIcons.Fairy width={25} fill="black"/> 
              </TouchableOpacity>


              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('fighting')}>
                <AppIcons.Fighting width={25} fill="black"/> 
              </TouchableOpacity> 

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('fire')}>
                <AppIcons.Fire width={25} fill="black"/> 
              </TouchableOpacity>


              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('flying')}>
                <AppIcons.Flying width={25} fill="black"/> 
              </TouchableOpacity>


              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('ghost')}>
                <AppIcons.Ghost width={25} fill="black"/> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('grass')}>
                <AppIcons.Grass width={25} fill="black"/> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('ground')}>
                <AppIcons.Ground width={25} fill="black"/> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('ice')}>
                <AppIcons.Ice width={25} fill="black"/> 
              </TouchableOpacity>


              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('normal')}>
                <AppIcons.Normal width={25} fill="black"/> 
              </TouchableOpacity>



              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('poison')}>
                <AppIcons.Poison width={25} fill="black"/> 
              </TouchableOpacity>



              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('psychic')}>
                <AppIcons.Psychic width={25} fill="black"/> 
              </TouchableOpacity>


              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('rock')}>
                <AppIcons.Rock width={25} fill="black"/> 
              </TouchableOpacity>



              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('steel')}>
                <AppIcons.Steel width={25} fill="black"/> 
              </TouchableOpacity>



              <TouchableOpacity style={styles.filterTypeIcons} onPress={()=>selectedFilter('water')}>
                <AppIcons.Water width={25} fill="black"/> 
              </TouchableOpacity>

            </View>
        </View>

      </View> 
      
    </View>
  </Modal> 
  )
}

export default FilterModal

const styles = StyleSheet.create({
    bottomSheet:{
        width:'100%', height:25, 
        backgroundColor:'transparent', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
      },
      filterContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff',
        borderTopLeftRadius:33,
        borderTopRightRadius:33,
        paddingHorizontal:34,
        paddingTop:33
      },
      filterTypeIcons:{
        width:40, height:40, 
        backgroundColor:'#f1f1f1',
        borderRadius:22,
        marginRight:6, 
        marginVertical:6,
        justifyContent:'center',
        alignContent: 'center',
        alignItems:'center'
      }
})