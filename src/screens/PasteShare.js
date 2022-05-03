import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,Alert
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import cloud from '../statics/notex.gif';
import FileShareComman from '../components/common/FileShareComman';
import { Colors } from '../configs/config';
import { createPaste } from '../apis';


function PasteShare({ navigation }) {

  const [data, setData] = React.useState({
    isBurn: false,
    isProtected: false,
    password: "",
    textData: ""
  });
  const [loader, setLoader] = React.useState(false)

  const handleShare = async () => {

    try {
      
      if(data.textData===""){
        Alert.alert("Share Easy Alert","Please enter some text")
        return
      }
      setLoader(true)
      console.log("call paste")
      const res = await createPaste(data)
      if (res && res.status === 200) {
        console.log("paste creaed", res.data)
        navigation.navigate("QRLink", { link: res.data.link })
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.warn(error);
      throw error;
    }

  }
  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 30}}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={cloud} style={{ width: 150, height: 150 }} />
        </View>
        <View style={{flex:1}} >
          <Text style={{ color: Colors.primary,fontFamily:"cursive",fontWeight:"700",fontSize:20 }}>Enter Your Note</Text>
          <TextInput
            editable
            maxLength={40}
            multiline
            style={{
              borderWidth: 1,
              borderColor: Colors.primary,
              color:Colors.primary,
              borderRadius: 5,
              marginVertical: 8,
              fontSize: 20,
              paddingHorizontal: 10,
              height: 150,
              textAlignVertical: 'top',
            }}
            onChangeText={text => setData(p => ({ ...p, textData: text }))}
          />
        </View>

        <FileShareComman setData={setData} data={data} />
        <TouchableHighlight
          style={{
            flex: 1,
            minHeight: 50,
            backgroundColor: Colors.primary,
            borderRadius: 5,
            marginVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleShare()}
        >
          {loader ? <Bubbles size={10} color="#FFF" /> : <Text style={{ color: Colors.tried,fontFamily:"cursive",fontWeight:"700",fontSize:20 }}>Share</Text>}

        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

export default PasteShare;
