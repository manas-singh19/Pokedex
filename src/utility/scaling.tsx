import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;
const scaleVertical = SCREEN_HEIGHT / 812;

// Font size normalization function
export function actuatedNormalize(size: number): number {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

// Height normalization function
export function actuatedNormalizeVertical(size: number): number {
  const newSize = size * scaleVertical;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

// Check if the device is a tablet
export function isTab(): boolean {
  return SCREEN_WIDTH > 550;
}

// Check if the screen height is between 740 and 760
export function isScreenHeight770(): boolean {
  return SCREEN_HEIGHT > 740 && SCREEN_HEIGHT < 760;
}

// Get window size
export function getWindowSize(): { width: number; height: number } {
  return Dimensions.get('window');
}

// Utility object with helper methods
export const Util = {
  getHeight: (percent: number = 100): number => {
    return (Util.getWindowSize().height * percent) / 100;
  },
  getWidth: (percent: number = 100): number => {
    return (Util.getWindowSize().width * percent) / 100;
  },
  getWindowSize: (): { width: number; height: number } => Dimensions.get('window'),
  
  getWindowHeight:():number => Dimensions.get('window').height,
  
};
