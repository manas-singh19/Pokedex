/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { enableScreens } from 'react-native-screens';

 
import { ThemeProvider } from './src/theme/themeProviderProps';


// AppRegistry.registerComponent(appName, () => App);
// Wrap the app with the ThemeProvider to provide theme context globally
AppRegistry.registerComponent(appName, () => () => (
    <ThemeProvider>
      <App />
    </ThemeProvider>
));
