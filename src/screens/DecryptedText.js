import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,ToastAndroid
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../configs/config';
import Clipboard from '@react-native-community/clipboard';


function DecryptedText({route}) {
  const { text = "" } = route.params;
    const handleCopy=()=>{
        Clipboard.setString(text)
        ToastAndroid.show("text copied",ToastAndroid.SHORT)
    }
     
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
      }}>
           <TouchableHighlight onPress={handleCopy} underlayColor="none"  >
        <View
          style={{
            
            
            elevation: 0,
            display:"flex",
            alignItems:"flex-end",
            justifyContent:"flex-end"
          }}>
        
          <MaterialCommunityIcons
            name="content-copy"
            style={{fontSize: 20, marginLeft: 10}}
            
          />
        </View>
      </TouchableHighlight>
      <ScrollView>
        <Text>
          {text}
        </Text>
      </ScrollView>
    </View>
  );
}

export default DecryptedText;
