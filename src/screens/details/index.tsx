import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView, StatusBar } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import ScreenWrapper from '../../components/screenWrapper';
import HeaderBack from '../../components/headers/headerBack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../theme/themeProviderProps';
 
import AppIcons from '../../utility/icons';  
import getPokemonData from './apiCall';

import AsyncStorage from '@react-native-async-storage/async-storage';
 
// Define the route params type
type RootStackParamList = {
  Details: { id?: number; name?: string; color?: string, ability:string[] };
};

// Define the PokemonDetail type
type PokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    species: { name: string };
    base_experience: string;
    sprites:any
    stats:any;
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { id, name, color, ability } = route.params || {};

  const { theme } = useTheme(); 

    
  const [activeSection,setactiveSection] = useState('about');  

  const { pokemonDetails, isLoading, pokemonDetailSpecies, evolutionChain } = getPokemonData(id);
  
 
    // State initialization
    // const [stats, setStats] = useState({
    //     hp: { value: 8, min: 0, max: 45, bar: 2 },
    //     attack: { value: 21, min: 200, max: 292, bar: 30 },
    //     defense: { value: 24, min: 200, max: 292, bar: 43 },
    //     SpAtk: { value: 53, min: 200, max: 292, bar: 55 },
    //     SpDef: { value: 99, min: 200, max: 292, bar: 74 },
    //     speed: { value: 23, min: 200, max: 292, bar: 31 } 
    // }); 

    const [stats, setStats] = useState<Record<string, { value: number; min: number; max: number; bar: number }>>({});
 
    useFocusEffect(
        useCallback(() => {  
          if (pokemonDetails) {
            // console.log("screen went in focus. --  --- ")
            // console.log("Pokemon Details:", pokemonDetails);
            // console.log("pokemonDetailSpecies: ",pokemonDetailSpecies); 
             console.log("evolutionChain: ",evolutionChain);
          }
          return () => {  
            console.log('Screen went out of focus');  
          };
        }, [])
    ); 

    useEffect(() => {
        if (!pokemonDetails || !pokemonDetails.stats) return;
        
        const updatedStats = pokemonDetails.stats.reduce((acc:any, item:any) => {
            acc[item.stat.name] = {
                value: item.base_stat,  // Use base_stat from response
                min: item.effort,                 // Set appropriate min values
                max: item.base_stat,               // Set appropriate max values
                bar: Math.round((item.effort / item.base_stat) * 100), // Calculate bar percentage
            };
            return acc;
        }, {} as Record<string, { value: number; min: number; max: number; bar: number }>);
        
        setStats(updatedStats);
    }, [pokemonDetails]); 

    const [favoritePokemon, setFavoritePokemon] = useState<number[]>([]);
    useEffect(()=>{
        console.log("favoritePokemon:", favoritePokemon);
    },[favoritePokemon]);

    // Load favorites from LocalStorage when the component mounts
    useEffect(() => {
      const loadFavorites = async () => {
        const storedFavorites = await AsyncStorage.getItem('favoritePokemon');
        if (storedFavorites) {
          setFavoritePokemon(JSON.parse(storedFavorites));
        }
      };
      loadFavorites();
    }, []);
    
    // Function to handle favorite/unfavorite logic
    const favHandler = async (id: number) => {
      try {
        let updatedFavorites = [...favoritePokemon];
    
        if (id !== undefined && updatedFavorites.includes(id)) {
          // Remove from favorites
          updatedFavorites = updatedFavorites.filter((favId) => favId !== id);
        } else {
          // Add to favorites
          updatedFavorites.push(id);
        }
    
        // Save updated favorites in LocalStorage
        await AsyncStorage.setItem('favoritePokemon', JSON.stringify(updatedFavorites));
        
        // Update state
        setFavoritePokemon(updatedFavorites);
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }; 
        

  return (
    <ScreenWrapper>
      <HeaderBack title="Pokemon Details" back={true} color={color || '#ffffff'} normal={false} />
        
      <StatusBar backgroundColor={color} barStyle={theme.isDark ? "dark-content" : "light-content"}/>

      <View style={[styles.container, { backgroundColor: color || '#ffffff', position:'relative' }]}>
        {/* 
        <Text style={styles.text}>Pokemon ID: {id}</Text>
        <Text style={styles.text}>Pokemon Name: {name}</Text> */}
        <TouchableOpacity style={{position:'absolute', top:-50, right:0, zIndex:999, width:40, height:40}} onPress={()=>favHandler(id)}> 
            {
                id !== undefined && favoritePokemon.includes(id) ? 
                <AppIcons.HeartColor width={30}  
                    fill="red" // Change color if favorited
                    style={{marginTop:-24}}
                />  
                :
                <AppIcons.Heart width={30} 
                 // fill="white"
                 fill="white" 
                /> 
            } 
        </TouchableOpacity>

        <View style={{height:'25%', backgroundColor:'transparent', justifyContent:'center'}}>
            <View style={styles.innerUpperContainer}>
                <View style={styles.innerUpperContainerImage}> 
                  {/* {pokemonDetails && (
                    <Image source={{ uri: `${pokemonDetails.sprites.other.home.front_default}` }} style={styles.pokemonImage} />
                  )} */}
                   {pokemonDetails && pokemonDetails.sprites.other['official-artwork'].front_default && (
                        <Image 
                            source={{ uri: pokemonDetails.sprites.other['official-artwork'].front_default }} 
                            style={styles.pokemonImage} 
                        />
                    )}
                </View>
                <View style={styles.innerUpperContainerText}>
                    <Text style={[styles.titleCode, {fontWeight:theme.fontWeights.bold}]}># {id}</Text>
                    <Text style={[styles.name,{fontWeight:theme.fontWeights.extraBold, textTransform:'capitalize'}]}>{name}</Text>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        gap: 5,
                    }}> 
                         {ability.map((item, index) => ( 
                            <>
                            {
                                item == 'bug'? <AppIcons.BugType width={60} fill="white"/>:
                                item == 'dark'? <AppIcons.DarkType width={60} fill="white"/>:
                                item == 'dragon'? <AppIcons.DragonType width={60} fill="white"/>:
                                item == 'electric'? <AppIcons.ElectricType width={60} fill="white"/>:
                                item == 'fairy'? <AppIcons.FairyType width={60} fill="white"/>:
                                item == 'fighting'? <AppIcons.FightingType width={60} fill="white"/>:
                                item == 'fire'? <AppIcons.FireType width={60} fill="white"/>:
                                item == 'flying'? <AppIcons.FlyingType width={60} fill="white"/>:
                                item == 'ghost'? <AppIcons.GhostType width={60} fill="white"/>:
                                item == 'grass'? <AppIcons.GrassType width={60} fill="white"/>:
                                item == 'ice'? <AppIcons.IceType width={60} fill="white"/>:
                                item == 'normal'? <AppIcons.NormalType width={60} fill="white"/>:
                                item == 'poison'? <AppIcons.PoisonType width={60} fill="white"/>:
                                item == 'psychic'? <AppIcons.PsychicType width={60} fill="white"/>: 
                                item == 'rock'? <AppIcons.RockType width={60} fill="white"/>: 
                                item == 'steel'? <AppIcons.SteelType width={60} fill="white"/>:
                                item == 'water'? <AppIcons.WaterType width={60} fill="white"/>:  
                                null
                            }
                            </>
                        ))}
                    </View>
                </View>
            </View>
            <AppIcons.Pattern width={'30%'} height={50} fill="white" style={{position:'absolute', right:0, bottom:-5}}/>
            <AppIcons.BlurIcon width={'90%'} height={80} fill="white" style={{position:'absolute', top:-15}}/>

            <AppIcons.Pokeball width={'20%'} height={80} fill="white" style={[{position:'absolute', bottom:-80},activeSection == 'about'?{left:0}:activeSection == 'stats'?{left:160}:activeSection == 'evolution'?{right:0}:{left:0}]}/>

        </View>

        <View style={{height:'75%', backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}}>
            <View style={[styles.otherBox]}>
                <TouchableOpacity style={{width:'31%'}} onPress={()=>setactiveSection('about')}>
                    <Text style={[styles.otherBoxText,activeSection=="about"?{color:'#ffffff'}:{color:'#ffffff92'}]}>About</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'31%', justifyContent:'center', alignContent:'center', alignItems:'center'}} onPress={()=>setactiveSection('stats')}>
                    <Text style={[styles.otherBoxText,activeSection=="stats"?{color:'#ffffff'}:{color:'#ffffff92'}]}>Stats</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'31%', justifyContent:'center',  alignItems:'flex-end'}} onPress={()=>setactiveSection('evolution')}>
                    <Text style={[styles.otherBoxText,activeSection=="evolution"?{color:'#ffffff'}:{color:'#ffffff92'}]}>Evolution</Text> 
                </TouchableOpacity>  
            </View>

            {
                activeSection == 'about' &&( 
                <View style={{width:'100%', height:'92%', backgroundColor:theme.colors.background, borderTopEndRadius:22, borderTopStartRadius:22, padding:18, paddingTop:33, paddingBottom:0}}>
                    
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Text style={{
                            fontSize:theme.fonts.b4,
                            fontWeight:theme.fontWeights.normal,
                            color:theme.isDark?'#fff':'#000',
                            
                        }}>{pokemonDetailSpecies ? pokemonDetailSpecies.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, ' ') : 'N/A'}</Text>       

                        {/* Start: Pokedex Data  */}
                        <View style={{marginVertical:28}}>
                            <Text style={{
                                fontSize:theme.fonts.b2,
                                fontWeight:theme.fontWeights.exExtraBold,
                                color:color
                            }}>Pokedex Data</Text>
                            <View style={styles.tableData}>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Species</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000', textTransform:'capitalize'}]}>{pokemonDetails ? pokemonDetails.species.name : 'N/A'}</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Height</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>{pokemonDetails ? pokemonDetails.height : 'N/A'}</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Weight</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>{pokemonDetails ? pokemonDetails.weight : 'N/A'}</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                        <Text style={[styles.tableText, { width: '40%', color: theme.isDark ? '#fff' : '#000' }]}>
                                            Abilities
                                        </Text>
                                        <View style={{ width: '60%', flexDirection:'row', flexWrap:'wrap' }}>
                                            {pokemonDetails?.abilities?.length > 0 ? (
                                                pokemonDetails.abilities.map((item:any, index:number) => (
                                                    <Text key={index} style={[styles.tableText, { color: theme.isDark ? '#fff' : '#000' } ,index==0?{marginLeft:0}:{marginLeft:4}, {textTransform:'capitalize'}]}>
                                                        {item.ability.name},
                                                    </Text>
                                                ))
                                            ) : (
                                                <Text style={[styles.tableText, { color: theme.isDark ? '#fff' : '#000' }]}>
                                                    N/A
                                                </Text>
                                            )}
                                        </View>
                                </View>
                             
                            </View>
                        </View>
                        {/* End: Pokedex Data  */}

                        {/* Start: Tranning */}
                        <View style={{marginVertical:0}}>
                            <Text style={{
                                fontSize:theme.fonts.b2,
                                fontWeight:theme.fontWeights.exExtraBold,
                                color:color
                            }}>Training</Text>
                            <View style={styles.tableData}>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%', color:theme.isDark?'#fff':'#000',}]}>Generation</Text>
                                    <Text style={[styles.tableText,{width:'60%', color:theme.isDark?'#fff':'#000',textTransform:'capitalize'}]}>{pokemonDetailSpecies?pokemonDetailSpecies.generation.name.replace("-"," "):"N/A"}</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000',}]}>Catch Rate</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>{pokemonDetailSpecies?pokemonDetailSpecies.capture_rate:"N/A"}</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Growth Rate</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000', textTransform:'capitalize'}]}>{pokemonDetailSpecies?pokemonDetailSpecies.growth_rate.name.replace("-"," "):"N/A"}</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Base Exp</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}> {pokemonDetails ? pokemonDetails.base_experience : 'N/A'}</Text>
                                </View> 
                            </View>
                        </View>
                        {/* End: Tranning */} 

                    </ScrollView> 

                </View> 
                )
            }

            {
                activeSection == 'stats' &&(
                    <View style={{width:'100%', height:'92%', backgroundColor:theme.colors.background, borderTopEndRadius:22, borderTopStartRadius:22, padding:18, paddingTop:0, paddingBottom:0}}> 
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{marginVertical:28}}>
                                    <Text style={{
                                        fontSize:theme.fonts.b2,
                                        fontWeight:theme.fontWeights.exExtraBold,
                                        color:color
                                    }}>Base Stats</Text>
                                    <View style={styles.tableData}> 
                                        
                                        {Object.entries(stats).map(([key, value]) => (
                                            <View style={{
                                                width:'100%',
                                                height:35,
                                                flexDirection:'row', 
                                                justifyContent:'center',
                                                alignContent:'center',
                                                alignItems:'center'
                                            }}>
                                                <View style={{flexDirection:'row'}}> 
                                                    <View style={{width:'20%',}}>
                                                        <Text style={{
                                                            fontSize:theme.fonts.b3,
                                                            fontWeight:theme.fontWeights.normal,
                                                            color:theme.isDark?'#fff':'#000',
                                                            textTransform:'capitalize'
                                                        }}>{key}</Text>
                                                    </View> 
                                                    <View style={{width:'55%',flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12}}>
                                                        <Text style={{
                                                            fontSize:theme.fonts.b3,
                                                            fontWeight:theme.fontWeights.normal,
                                                            color:theme.isDark?'#fff':'#000'
                                                        }}>{(value as { value: number }).value}</Text>
                                                        {
                                                            key != 'total'&&(
                                                                <View style={{width:'80%', height:6, position:'relative'}}>
                                                                    <View style={{width:'100%', height:'100%', backgroundColor:'#f1f1f1',position:'absolute', left:0, borderRadius:33}}></View> 
                                                                    <View style={{width:`${value.bar}%`, height:'100%', backgroundColor:color,position:'absolute', left:0, borderRadius:33}}></View> 
                                                                </View>
                                                            )
                                                        } 
                                                    </View>
                                                    <View style={{width:'25%',flexDirection:'row', justifyContent:'space-between', paddingHorizontal:12}}>
                                                        
                                                        {
                                                            key=='total'?
                                                            <>
                                                                <Text style={{
                                                                fontSize:theme.fonts.b3,
                                                                fontWeight:theme.fontWeights.normal,
                                                                color:theme.isDark?'#fff':'#000'
                                                            }}>Min</Text>
                                                            <Text style={{
                                                                fontSize:theme.fonts.b3,
                                                                fontWeight:theme.fontWeights.normal,
                                                                color:theme.isDark?'#fff':'#000'
                                                            }}>Max</Text>
                                                        </>:
                                                        <>
                                                            <Text style={{
                                                            fontSize:theme.fonts.b3,
                                                            fontWeight:theme.fontWeights.normal,
                                                            color:theme.isDark?'#fff':'#000'
                                                        }}>{value.min}</Text>
                                                        <Text style={{
                                                            fontSize:theme.fonts.b3,
                                                            fontWeight:theme.fontWeights.normal,
                                                            color:theme.isDark?'#fff':'#000'
                                                        }}>{value.max}</Text>
                                                        </>
                                                        }
                                                    </View>

                                                </View>
                                            </View> 
                                        ))}   

                                        <Text style={{
                                            fontSize:theme.fonts.b4,
                                            fontWeight:theme.fontWeights.normal,
                                            color:theme.isDark?'#fff':'#000',
                                            marginTop:12
                                            
                                        }}>{pokemonDetailSpecies ? pokemonDetailSpecies.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, ' ') : 'N/A'}</Text>

                                    </View>
                                </View>
                            </ScrollView>
                    </View> 
                )
            } 
              
            {
                activeSection == 'evolution' &&(
                    <View 
                        style={{
                            width: '100%', 
                            height: '92%', 
                            backgroundColor: theme.colors.background, 
                            borderTopEndRadius: 22, 
                            borderTopStartRadius: 22, 
                            padding: 18, 
                            paddingTop: 0, 
                            paddingBottom: 0
                        }}
                    > 
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginVertical: 28 }}>
                            <Text 
                                style={{
                                fontSize: theme.fonts.b2,
                                fontWeight: theme.fontWeights.exExtraBold,
                                color: color
                                }}
                            >
                                Evolution Chart
                            </Text>

                            {evolutionChain.length > 0 ? (
                                evolutionChain.map((item: any, index: number) => {
                                const nextEvolution = evolutionChain[index + 1];
                                return (
                                    <View key={index} style={styles.evolutionChartContainer}>
                                    {/* Current Evolution Stage */}
                                    <View style={[styles.evolutionChartContaineritem, { width: '40%' }]}>
                                        <Image source={{ uri: item.image }} style={{ width: 90, height: 100 }} />
                                        <Text style={[styles.evolutionCharttext, { color: theme.isDark ? '#fff' : '#000' }]}>
                                        {item.name}
                                        </Text>
                                    </View>

                                    {/* Evolution Arrow (If next stage exists) */}
                                    {nextEvolution && (
                                        <View style={[styles.evolutionChartContaineritem, { width: '20%' }]}>
                                        {theme.isDark ? (
                                            <AppIcons.LevelUpWhite width={'40%'} height={50} fill="white" />
                                        ) : (
                                            <AppIcons.LevelUp width={'50%'} height={50} fill="white" />
                                        )}
                                        </View>
                                    )}

                                    {/* Next Evolution Stage */}
                                    {nextEvolution && (
                                        <View style={[styles.evolutionChartContaineritem, { width: '40%' }]}>
                                        <Image source={{ uri: nextEvolution.image }} style={{ width: 90, height: 100 }} />
                                        <Text style={[styles.evolutionCharttext, { color: theme.isDark ? '#fff' : '#000' }]}>
                                            {nextEvolution.name}
                                        </Text>
                                        </View>
                                    )}
                                    </View>
                                );
                                })
                            ) : (
                                <Text style={{ color: theme.isDark ? '#fff' : '#000', textAlign: 'center', marginTop: 20 }}>
                                No Evolution Data Available
                                </Text>
                            )}
                            </View>
                        </ScrollView>
                    </View>
                )
            }

        </View>
        
      </View>
    </ScreenWrapper>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1, 
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  innerUpperContainer:{
    width:'100%',
    height:150, 
    flexDirection:'row',
    justifyContent:'space-between',
     
  },
  innerUpperContainerImage:{
    width:'40%',
    height:150, 
  },
  innerUpperContainerText:{
    width:'55%',
    height:150, 
    justifyContent:'center', 
  },
  titleCode: {
    fontSize: 13,
    fontWeight: '500',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff'
  },
  pokemonImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain', 
  },
  abilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  abilityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  otherBox:{
    width:'100%',  
    height:'8%',  
    padding:12,
    flexDirection:'row',
    justifyContent:'space-around',
  },
  otherBoxText:{
    fontSize:16,
    fontWeight:'bold',
    color:'white'
  },
  tableData:{
    width:'100%',
    minHeight:100, 
    marginVertical:9, 
  },
  tableDataRow:{
    width:'100%',
    height:35, 
    flexDirection:'row', 
    alignItems:'center'
  },
  tableText:{
    fontSize:15,
    fontWeight:'normal',
    color:'#131313'
  },
  evolutionChartContainer:{
    width:'100%',
    minHeight:90, 
    marginVertical:12,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  evolutionChartContaineritem:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  evolutionChartCode:{
    fontSize:12,
    fontWeight:'bold'
  },evolutionCharttext:{
    fontSize:18,
    fontWeight:'bold',
  }
});