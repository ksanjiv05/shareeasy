import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {Colors} from '../../configs/config'

function FileShareComman({setData,data}) {
 
  const handleChange= (key,value)=>{
  setData(p=>({...p,[key]:value}))
  }
 
  return (
    <>
      <View
        style={{
          width: '100%',
          height: 40,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CheckBox
          disabled={false}
          value={data.isBurn}
          // tintColor={Colors.primary}
          // onCheckColor={Colors.primary}
          tintColors={{ true: Colors.primary, false: Colors.primary }}
          style={{borderColor:"red",borderWidth:5}}
          
          onValueChange={newValue =>handleChange("isBurn",newValue)}
        />
        <Text style={{color:Colors.primary}}>Burn after download</Text>
      </View>

      <View
        style={{
          width: '100%',
          height: 40,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CheckBox
          disabled={false}
          value={data.isProtected}
          tintColors={{ true: Colors.primary, false: Colors.primary }}
          onValueChange={newValue =>handleChange("isProtected",newValue)}
        />
        <Text style={{color:Colors.primary}}>Encrypted share</Text>
      </View>
      <View  style={{display:data.isProtected?"flex":"none"}}>
        <Text style={{color:Colors.primary}}>Enter Encryption Key</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor:Colors.primary,
            borderRadius: 5,
            marginVertical: 8,
            fontSize: 20,
            paddingHorizontal: 10,
          }}
          onChangeText={text=>handleChange("password",text)}
        />
      </View>
    </>
  );
}

export default FileShareComman;
