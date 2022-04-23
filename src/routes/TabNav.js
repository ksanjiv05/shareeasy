import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FileShare from '../screens/FileShare';
import PasteShare from '../screens/PasteShare';
import URLShort from '../screens/URLShort';
import {Colors} from '../configs/config';
import QRScanner from '../screens/QRScanner';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarInactiveTintColor: Colors.lightBlack,
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {height: 55},
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 5,
        },
      }}>
      <Tab.Screen
        name="file"
        component={FileShare}
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <MaterialCommunityIcons
              name="file-link-outline"
              size={size}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="paste"
        component={PasteShare}
        options={{
          headerShown: false,
          //   headerStyle: {backgroundColor: Colors.primary},
          //   headerTintColor: Colors.white,
         
          tabBarIcon: ({size, color, focused}) => (
            <MaterialCommunityIcons
              name="content-paste"
              size={size}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="url"
        component={URLShort}
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <MaterialCommunityIcons
              name="link-variant-minus"
              size={size + 5}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="scan"
        component={QRScanner}
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={size + 5}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
