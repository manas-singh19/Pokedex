import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/screenWrapper';
import HeaderBack from '../../components/headers/headerBack';


const FavoriteScreen = () => {
  return (
    <ScreenWrapper>
       <HeaderBack title="Pokemon Details" back={true} color={'#ffffff'} normal={true}/>
        <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
            
        </View> 
    </ScreenWrapper>
  )
}

export default FavoriteScreen;

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1, 
      },
})