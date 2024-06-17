import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { PlayVideoScreen } from '../screens/PlayVideo/PlayVideoScreen';
import { HistoryScreen } from '../screens/History/HistoryScreen';
export type RootStackParamsList = {
  Home: undefined;
  PlayVideo: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();



export const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayVideo" component={PlayVideoScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};
