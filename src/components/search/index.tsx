import { StyleSheet, Text, TextInput, View } from 'react-native'
import React,{memo} from 'react'
import AppIcons from '../../utility/icons'

interface SearchBarProps {
  placeHolderText: string;
  handlerFunc: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeHolderText, handlerFunc }) => {

  return (
    <View style={styles.searchContainer}>
        <AppIcons.Search width={20} height={20} fill="black" style={styles.searchIcon}/>
        <TextInput style={styles.searchInput} 
            placeholder={placeHolderText} 
            placeholderTextColor={"#747476"}
            onChangeText={handlerFunc}
        />
    </View>
  )
}

export default memo(SearchBar)

const styles = StyleSheet.create({
    searchContainer:{
        width:'100%',
        height:50, 
        borderRadius:9,
        position:'relative'
    },
    searchInput:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F2F2F2',
        paddingLeft:44, 
        borderRadius:9,
        position:'relative',
        fontSize:16,
        color:'#747476'
    },
    searchIcon:{
        position: 'absolute',
        top:15,
        left:14,
        zIndex:999
    }
})