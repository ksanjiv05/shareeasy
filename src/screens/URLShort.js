import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,TextInput,Alert
} from 'react-native';
import { createShorterLink } from '../apis';
import { Colors } from '../configs/config';
import cloud from '../statics/url.gif';

function URLShort({navigation}) {
  const [data, setData] = React.useState({
    isBurn:false,
    isProtected:false,
    password:"",
    textData:""
  });
  const handleShare=async()=>{
    try {
      if(data.textData===""){
        Alert.alert("Share Easy Alert","Please enter some url")
        return
      }
      const res = await createShorterLink(data)
      
      if(res&&res.status===200){
        console.log("file upodaed" ,res.data)
        navigation.navigate("QRLink",{link:res.data.link})
      }
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
  return (
    // <ScrollView>

    <View style={{flex: 1, marginHorizontal: 30,justifyContent:"center"}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={cloud} style={{width: 150, height: 150}} />
      </View>
      <View >
        <Text style={{color: Colors.primary,fontFamily:"cursive",fontWeight:"700",fontSize:20}}>Enter any link</Text>
        <TextInput
         
         onChangeText={text=>setData(p=>({...p,textData:text}))}
          style={{
            borderWidth: 1,
            borderColor: Colors.primary,
            borderRadius: 5,
            marginVertical: 8,
            fontSize: 20,
            paddingHorizontal: 10,
            textAlignVertical:"top",
            color:Colors.primary,
            
          }}
        />
      </View>
      
     
      <TouchableHighlight
        style={{
          flex: 1,
          maxHeight: 50,
          backgroundColor: Colors.primary,
          borderRadius: 5,
          marginVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={()=>handleShare()}
        >
        <Text style={{color: Colors.tried,fontFamily:"cursive",fontWeight:"700",fontSize:20}}>Share</Text>
      </TouchableHighlight>
    </View>
  // </ScrollView>
  )
}

export default URLShort