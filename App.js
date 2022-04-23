/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, View, useColorScheme,ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStack from './src/routes/Index';

const linking = {
  prefixes: ['shareeasy://',"https://shareeasy.in"]
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  React.useEffect(()=>{
    async function store() {
      try {
        const isFirst = await AsyncStorage.getItem('isFirst')
        if(isFirst!=="isFirst"){
          await AsyncStorage.setItem('isFirst', "isFirst")
        }
        console.log("is first ",isFirst)
      } catch (e) {
        console.log("unable to save first lunch data  ",e)
      }
    }
    store();
  },[])
  return (
    <>
      <StatusBar />
      <NavigationContainer linking={linking}  fallback={<ActivityIndicator color="blue" size="large" />}>
        <View style={{flex: 1}}>
          <HomeStack />
        </View>
      </NavigationContainer>
    </>
  );
};

export default App;
