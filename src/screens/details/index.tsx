import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/screenWrapper';
import HeaderBack from '../../components/headers/headerBack';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme/themeProviderProps';
 
import AppIcons from '../../utility/icons'; 
import { FadeInLeft } from 'react-native-reanimated';

// Define the route params type
type RootStackParamList = {
  Details: { id?: number; name?: string; color?: string };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { id, name, color } = route.params || {};

  const { theme } = useTheme(); 

  useEffect(() => {
    console.log('Details Screen Params:', { id, name, color });
  }, [id, name, color]);

  const [ability,setability] = useState([
    { title: "water", color: "#4A90DA", abilityIcon:"water"  },
    { title: "water", color: "#4A90DA", abilityIcon:"water"  }
  ])

  const [activeSection,setactiveSection] = useState('about');

 
  
    // Define TypeScript types
    type StatDetail = {
        value: number;
        min: number;
        max: number;
        bar: number;
    };
  
  type Stats = {
    hp: StatDetail;
    attack: StatDetail;
    defense: StatDetail;
    SpAtk: StatDetail;
    SpDef: StatDetail;
    speed: StatDetail;
    total: StatDetail;
  };
  
    // State initialization
    const [stats, setStats] = useState<Stats>({
        hp: { value: 45, min: 200, max: 292, bar: 10 },
        attack: { value: 21, min: 200, max: 292, bar: 30 },
        defense: { value: 24, min: 200, max: 292, bar: 43 },
        SpAtk: { value: 53, min: 200, max: 292, bar: 55 },
        SpDef: { value: 99, min: 200, max: 292, bar: 74 },
        speed: { value: 23, min: 200, max: 292, bar: 31 },
        total: { value: 319, min: 0, max: 0, bar: 0 },
    });

  return (
    <ScreenWrapper>
      <HeaderBack title="Pokemon Details" back={true} color={color || '#ffffff'}/>
      <View style={[styles.container, { backgroundColor: color || '#ffffff' }]}>
        {/* 
        <Text style={styles.text}>Pokemon ID: {id}</Text>
        <Text style={styles.text}>Pokemon Name: {name}</Text> */}
        <View style={{height:'25%', backgroundColor:'transparent', justifyContent:'center'}}>
            <View style={styles.innerUpperContainer}>
                <View style={styles.innerUpperContainerImage}>
                 <Image source={{ uri: 'https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png' }} style={styles.pokemonImage} />
                </View>
                <View style={styles.innerUpperContainerText}>
                    <Text style={[styles.titleCode, {fontWeight:theme.fontWeights.bold}]}>#112</Text>
                    <Text style={[styles.name,{fontWeight:theme.fontWeights.extraBold}]}>{name}</Text>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        gap: 5,
                    }}> 
                        {ability.map((item, index) => (
                            <View key={index} style={[styles.abilityBadge, { backgroundColor: item.color }]}>
                            {item.abilityIcon === 'grass' ? <AppIcons.Grass width={20} height={20} fill="white" /> :
                            item.abilityIcon === 'poison' ? <AppIcons.Poison width={20} height={20} fill="white" /> :
                            item.abilityIcon === 'water' ? <AppIcons.Water width={20} height={20} fill="white" /> :
                            item.abilityIcon === 'flying' ? <AppIcons.Flying width={20} height={20} fill="white" /> :
                            item.abilityIcon === 'fire' ? <AppIcons.Fire width={20} height={20} fill="white" /> :
                            item.abilityIcon === 'electric' ? <AppIcons.Electric width={20} height={20} fill="white" /> : null}
                            <Text style={styles.abilityText}>{item.title}</Text>
                            </View>
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
                            
                        }}>Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.</Text>       

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
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>Seed Pokémon</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Height</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>Seed Pokémon</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Weight</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>Seed Pokémon</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Abilities</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>Seed Pokémon</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Weaknesses</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>Seed Pokémon</Text>
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
                                    <Text style={[styles.tableText,{width:'40%', color:theme.isDark?'#fff':'#000',}]}>EV Yield</Text>
                                    <Text style={[styles.tableText,{width:'60%', color:theme.isDark?'#fff':'#000',}]}>1 Special Attack</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000',}]}>Catch Rate</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>45 (5.9% with PokéBall, full HP)</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Base Friendship</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>70 (normal)</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Base Exp</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>64</Text>
                                </View>
                                <View style={styles.tableDataRow}>
                                    <Text style={[styles.tableText,{width:'40%',color:theme.isDark?'#fff':'#000'}]}>Growth Rate</Text>
                                    <Text style={[styles.tableText,{width:'60%',color:theme.isDark?'#fff':'#000'}]}>Medium Slow</Text>
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
                                                        }}>{value.value}</Text>
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
                                            
                                        }}>Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.</Text>       
 

                                    </View>
                                </View>
                            </ScrollView>
                    </View> 
                )
            }

              
            {
                activeSection == 'evolution' &&(
                    <View style={{width:'100%', height:'92%', backgroundColor:theme.colors.background, borderTopEndRadius:22, borderTopStartRadius:22, padding:18, paddingTop:0, paddingBottom:0}}> 
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{marginVertical:28}}>
                                    <Text style={{
                                        fontSize:theme.fonts.b2,
                                        fontWeight:theme.fontWeights.exExtraBold,
                                        color:color
                                    }}>Evolution Chart</Text>
                                    
                                    <View style={styles.evolutionChartContainer}>
                                        <View style={[styles.evolutionChartContaineritem,{width:'40%'}]}>
                                            <Image source={{ uri: 'https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png' }} style={{width:90, height:100}} />
                                            <Text style={[styles.evolutionChartCode,{color:theme.isDark?'#fff':'#000'}]}>#992</Text>
                                            <Text style={[styles.evolutionCharttext,{color:theme.isDark?'#fff':'#000'}]}>Bulbasaur</Text>
                                        </View>
                                        <View style={[styles.evolutionChartContaineritem,{width:'20%'}]}> 
                                            {
                                                theme.isDark?
                                                <AppIcons.LevelUpWhite  width={'40%'} height={50} fill="white"/>
                                                :
                                                <AppIcons.LevelUp  width={'50%'} height={50} fill="white"/>
                                            }
                                        </View>
                                        <View style={[styles.evolutionChartContaineritem,{width:'40%'}]}>
                                            <Image source={{ uri: 'https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png' }} style={{width:90, height:100}} />
                                            <Text style={[styles.evolutionChartCode,{color:theme.isDark?'#fff':'#000'}]}>#992</Text>
                                            <Text style={[styles.evolutionCharttext,{color:theme.isDark?'#fff':'#000'}]}>Bulbasaur</Text>
                                        </View>
                                    </View> 

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