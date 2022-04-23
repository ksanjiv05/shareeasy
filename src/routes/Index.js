import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Index from '../screens/Index';
import TabNav from './TabNav';
import QRLink from '../screens/QRLink';
import Decryption from '../screens/Decryption';
import DecryptedText from '../screens/DecryptedText';
import Download from '../screens/Download';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      
      <Stack.Screen name="Home" component={Index} />
      <Stack.Screen name="QRLink" component={QRLink} />
      <Stack.Screen name="Tab" component={TabNav} />
      <Stack.Screen name="DecryptedText" component={DecryptedText} />
      <Stack.Screen name="Decryption" component={Decryption} />
      <Stack.Screen name="Download" component={Download} />
    </Stack.Navigator>
  );
}

export default HomeStack;
