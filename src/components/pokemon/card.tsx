import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AppIcons from '../../utility/icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
 
interface Ability {
  title: string;
  color: string;
  abilityIcon: string;
}

interface PokemonCardProps {
  id:number;
  color: string;
  titleCode: string;
  name: string;
  image: string;
  ability: Ability[];
}

 

const PokemonCard: React.FC<PokemonCardProps> = memo(({ color, titleCode, name, image, ability }) => {
 
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={()=>{navigation.navigate('DetailsScreen',{id:1})}}>
      <View style={styles.itemDetails}>
        <Text style={styles.titleCode}>{titleCode}</Text>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.itemDetailsInner}>
          {ability.map((item, index) => (
            <View key={index} style={[styles.abilityBadge, { backgroundColor: item.color }]}>
              {/* {
                item.icon=="gress" ? <AppIcons.Grass width={20} fill="white" /> :
                item.icon=="posion" ? <AppIcons.Poison width={20} fill="white" /> :
              }   */}
              {
                item.abilityIcon=="gress" ? <AppIcons.Grass width={20} height={20} fill="white" /> :
                item.abilityIcon=="posion" ? <AppIcons.Poison width={20} height={20} fill="white" /> : 
                item.abilityIcon=="water" ? <AppIcons.Water width={20} height={20} fill="white" /> : 
                item.abilityIcon=="flying" ? <AppIcons.Flying width={20} height={20} fill="white" /> : 
                item.abilityIcon=="fire" ? <AppIcons.Fire width={20} height={20} fill="white" /> : 
                item.abilityIcon=="electric" ? <AppIcons.Electric width={20} height={20} fill="white" /> : 
                null
              }
              <Text style={styles.abilityText}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.itemImage}>
        {image ? <Image source={{ uri: image }} style={styles.pokemonImage} /> : null}
      </View>
    </TouchableOpacity>
  );
});

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    borderRadius: 9,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop:14
  },
  itemDetails: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemImage: {
    width: '40%', 
    justifyContent: 'flex-end',
  },
  pokemonImage: {
    width: 120,
    height: 140,
    resizeMode: 'contain',
  },
  titleCode: {
    fontSize: 13,
    fontWeight: '400',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#ffffff'
  },
  itemDetailsInner: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
  },
  abilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  abilityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});