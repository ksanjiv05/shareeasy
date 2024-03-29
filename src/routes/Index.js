import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../screens/Index';
import TabNav from './TabNav';
import QRLink from '../screens/QRLink';
import Decryption from '../screens/Decryption';
import DecryptedText from '../screens/DecryptedText';
import Download from '../screens/Download';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

function HomeStack() {
  const [isFirst, setIsFirst] = React.useState(false)
  React.useEffect(() => {
    async function store() {
      try {
        const getIsFirst = await AsyncStorage.getItem('isFirst');
        setIsFirst(getIsFirst === "No")
        if (getIsFirst !== "isFirst") {
          await AsyncStorage.setItem('isFirst', "No")
        }
        console.log("is first ", getIsFirst)
      } catch (e) {
        console.log("unable to save first lunch data  ", e)
      }
    }
    store();
  }, [])
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {
        !isFirst ?
          <Stack.Screen name="Home" component={Index} />
          :<></> 
      }
      <Stack.Screen name="Tab" component={TabNav} />
      <Stack.Screen name="QRLink" component={QRLink} />
      <Stack.Screen name="DecryptedText" component={DecryptedText} />
      <Stack.Screen name="Decryption" component={Decryption} />
      <Stack.Screen name="Download" component={Download} />
    </Stack.Navigator>
  );
}

export default HomeStack;
