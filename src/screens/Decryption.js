import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput,

} from 'react-native';
import { Bubbles } from 'react-native-loader';

import { Colors } from '../configs/config';
import { getPaste, tryDrycription } from '../apis';
import { showToast } from '../utils/showToast';

function Decryption({ route, navigation }) {
  const { fileId = "", fileName = "", fileType = "" } = route.params;
  const [password, setPassword] = React.useState("");
  const [loader, setLoader] = React.useState(false)

  const handleDecryption = async () => {
    console.log("try to dec", fileType, fileId)
    setLoader(true)

    if (fileType === "file") {
      const res = await tryDrycription({ fileId, password });
      if (res && res.status === 200) {
        const token = res.data.token;
        navigation.navigate("Download", { token, fileName })
      }
      if (res && res.status === 201) {
        showToast("wrong drycryption key!")
      }
    } else {
      const res = await getPaste({ fileId, password });
      console.log("lii----", res.data)
      if (res && res.status === 200) {
       navigation.navigate("DecryptedText", { text:res.data.data })

      }
      if (res && res.status === 201) {
        showToast("wrong drycryption key!")
      }

    }
    setLoader(false)
  }

  return (

    <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'center', }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Image source={cloud} style={{width: 150, height: 150}} /> */}
      </View>
      <View
        style={{
          flex: 1,
          maxHeight: 80,
        }}>
        <Text style={{ color: Colors.primary }}>Enter Your Decryption key</Text>
        <TextInput
          onChangeText={text => setPassword(text)}
          style={{
            borderWidth: 1,
            borderColor: Colors.primary,
            borderRadius: 5,
            marginVertical: 8,
            fontSize: 20,
            paddingHorizontal: 10,
            textAlignVertical: 'top',
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
        onPress={handleDecryption}>
        {loader ? <Bubbles size={10} color="#FFF" /> : <Text style={{ color: Colors.secondry }}>Decrypte</Text>}
      </TouchableHighlight>
    </View>

  );
}

export default Decryption;
