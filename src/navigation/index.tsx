import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import {  MainStack } from './mainStack';

const Stack = createStackNavigator(); 

const AppStack: React.FC = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}

export default AppStack;