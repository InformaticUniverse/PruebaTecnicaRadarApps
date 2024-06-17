/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { RootStackNavigator } from './src/navigators/RootStackNavigator';



function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
    
    
  );
}


export default App;
