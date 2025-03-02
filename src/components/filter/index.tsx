import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import AppIcons from '../../utility/icons';

type IconKeys = keyof typeof AppIcons;
import { useTheme } from '../../theme/themeProviderProps';

interface FilterModalProps {
  model: boolean;
  filters:string;
  setModalHandler: (value: boolean) => void;
  selectedFilter: (type: string) => void;
}

const FILTER_TYPES = [
  'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 
  'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water',

  // 'bugSelected', 'darkSelected', 'dragonSelected', 'electricSelected', 'fairySelected', 'fightingSelected', 
  // 'fireSelected', 'flyingSelected', 'ghostSelected', 
  // 'grassSelected', 'groundSelected', 'iceSelected', 'normalSelected', 'poisonSelected', 'psychicSelected', 'rockSelected', 'steelSelected', 'waterSelected',
];

const FilterModal: React.FC<FilterModalProps> = ({ model, setModalHandler, selectedFilter,filters }) => {
  const { theme } = useTheme(); 
  const textColor = theme.isDark ? "#fff" : "#000";
  const bgColor = theme.colors.background;

  return (
    <Modal animationType="slide" transparent visible={model}>
      <View style={styles.modalContainer}>
        
        {/* Blur Effect */}
        <BlurView style={styles.blurView} blurType={theme.isDark ? 'dark' : 'light'} blurAmount={12} reducedTransparencyFallbackColor="black" />

        {/* Close Modal on Background Click */}
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalHandler(false)} />

        {/* Bottom Sheet */}
        <View style={styles.bottomSheetContainer}>
                        
          {/* Handle Bar */}
          <View style={{width:'100%', height:10, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={() => setModalHandler(false)} style={[styles.handleBar, { backgroundColor: theme.isDark?'#000':'#fff'}]} />
          </View>
          

          <View style={[styles.bottomSheet, { backgroundColor: bgColor, justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start' }]}>

            {/* Filter Section */}
            <Text style={[styles.title, { color: textColor, }]}>Filter</Text>
            <Text style={[styles.description, { color: textColor, }]}>
              Use advanced search to explore Pokémon by type, weakness, height, and more!
            </Text>

            {/* Type Section */}
            <Text style={[styles.subtitle, { color: textColor }]}>Type</Text>
            <View style={styles.filterGrid}>
              {FILTER_TYPES.map((type) => ( 
                <FilterTypeButton key={type} type={type} filters={filters} onPress={() => selectedFilter(type)} />
              ))}
            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
};

// const FilterTypeButton: React.FC<{ type: string; onPress: () => void; filters: string }> = ({ type, onPress, filters }) => {
//   const IconComponent = AppIcons[type.charAt(0).toUpperCase() + type.slice(1) as IconKeys]; 
//   return (
//     <TouchableOpacity style={styles.filterTypeButton} onPress={onPress}> 
//       {React.createElement(IconComponent, { width: 25, fill: "white" })}
//     </TouchableOpacity>
//   );
// }
const FilterTypeButton: React.FC<{ type: string; onPress: () => void; filters: string }> = ({ type, onPress, filters }) => {
  const isSelected = filters.includes(type);
  const iconName = isSelected ? `${type}Selected` : type;
  const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1) as IconKeys;
  const IconComponent = AppIcons[formattedIconName];

  return (
    <TouchableOpacity style={styles.filterTypeButton} onPress={onPress}>
      {IconComponent && React.createElement(IconComponent, { width: 60, fill: "white" })}
    </TouchableOpacity>
  );
};

export default FilterModal;

/* Styles */
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#0e0e0e61',
    justifyContent: 'flex-end',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 6, // Takes 60% height
    width: '100%',
  },
  bottomSheetContainer: {
    flex: 4, // Takes 40% height,
    justifyContent:'flex-start'
  },
  bottomSheet: {
    flex: 1,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingHorizontal: 34,
    paddingTop: 33,
    alignItems: 'center',
  },
  handleBar: {
    width: '20%',
    height: 10,
    borderRadius: 33,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterGrid: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start' 
  },
  filterTypeButton: {
    width: 45,
    height: 45,
    //backgroundColor: '#f1f1f1',
    borderRadius: 20,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});