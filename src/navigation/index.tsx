import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import {  MainStack } from './mainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator(); 

const AppStack: React.FC = () => {
    return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default AppStack;