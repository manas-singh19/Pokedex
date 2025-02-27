// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// }; 
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // 👈 Make sure this is at the BOTTOM of the array
  ],
};
