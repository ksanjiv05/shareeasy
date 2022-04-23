import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Colors } from '../configs/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { checkFile, getPaste } from '../apis';
import process from '../statics/process.gif';
import { showToast } from '../utils/showToast';


const width = Dimensions.get('screen').width;

function QRScanner({ navigation }) {
  const [isFlash, setIsFlash] = React.useState(false);
  const [loader, setLoader] = React.useState(false)
  const [link, setLink] = React.useState("")

  const goToText=async(fileId)=>{
    console.log("link---",fileId)
    const res = await getPaste({ fileId:fileId, password:"" });
    if (res && res.status === 200) {
      navigation.navigate("DecryptedText", { text:res.data.data })
     }
    else  {
       showToast("somthing wrong please try again !")
     }

  }

  const validateLink = async (linkStr) => {
    setLoader(true)
    
    const res = await checkFile(linkStr);
    
    if (res && res.status === 200) {
      const dataObj = res.data.file;
      console.log("dataobj",dataObj)
      switch (dataObj.fileType) {
        case 'file':
          dataObj.isProtected
            ? navigation.navigate('Decryption', { fileId: dataObj.fileId, fileName: dataObj.fileName,fileType:dataObj.fileType })
            : navigation.navigate('Download', { token: res.data.token, fileName: dataObj.fileName });
          break;
        case 'text':
          dataObj.isProtected
            ? navigation.navigate('Decryption', { fileId: dataObj.fileId, fileName: dataObj.fileName,fileType:dataObj.fileType })
            : goToText(dataObj.fileId)
          break;
        case 'url':
          Linking.openURL(linkStr).catch(err =>
            console.error('An error occured', err),
          );
          break;
        default:
          alert('Link is expired');
      }
      setLink("")
    }
    setLoader(false)
    // Linking.openURL(linkStr).catch(err =>
    //   console.error('An error occured', err),
    // );
  }

  const onSuccess = async e => {

    console.log('on success data ', e.data);
    validateLink(e.data)

    console.log('qr data ', e.data);
  };
  return (
    <ScrollView
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}>
        {
          loader ? <Image source={process} />
            :
            <QRCodeScanner
              onRead={onSuccess}
              cameraStyle={{
                borderRadius: 25,
                borderWidth: 2,
                borderColor: Colors.primary,
                overflow: 'hidden',
                marginHorizontal: 15,
                width: width - 30,

              }}
              reactivate={true}
              containerStyle={{ paddingVertical: 10 }}
              flashMode={
                isFlash
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              }
              topContent={
                <>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
                    <Text style={styles.centerText}>Scan QR to open secret</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <TextInput style={{ borderColor: Colors.primary, borderWidth: 1, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, width: width - 85, height: 55 }}
                        onChangeText={text => setLink(text)}
                      />
                      <TouchableOpacity
                        style={{ backgroundColor: Colors.primary, width: 55, height: 55, alignItems: "center", justifyContent: "center", borderBottomRightRadius: 5, borderTopRightRadius: 5 }}
                        onPress={() => validateLink(link)}>
                        <FontAwesome color={Colors.secondry} name="search" size={30} />
                      </TouchableOpacity></View>
                  </View>
                </>
              }
              bottomViewStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                //   backgroundColor: 'red',
              }}
              bottomContent={
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => setIsFlash(!isFlash)}>
                  <FontAwesome name="flash" size={30} />
                </TouchableOpacity>
              }
            />}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerText: {

    fontSize: 18,
    padding: 32,
    color: Colors.primary,
  },

  buttonTouchable: {
    padding: 16,
  },
});

export default QRScanner;
