import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Bubbles } from 'react-native-loader';
import FilePicker from '../components/file/FilePicker';
import cloud from '../statics/fl.gif';
import FileShareComman from '../components/common/FileShareComman';
import { Colors } from '../configs/config'
import { createFile } from '../apis';
import { showToast } from '../utils/showToast';

function FileShare({ navigation }) {
  const [file, setFile] = React.useState(null)
  const [data, setData] = React.useState({
    isBurn: false,
    isProtected: false,
    password: ""
  });
  const [loader, setLoader] = React.useState(false)

  const handleDocumentSelection = async () => {
    console.log('i am call ');
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      console.log('responce ', response);
      const sfile = response[0];
      if (sfile?.size < 250000) { 
        Alert("File Should be less then 250MB")
      }
      setFile(sfile)

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled')
      } else {
        console.warn(err);
        throw err;
      }

    }
  };
  const handleShare = async () => {
    try {
    
      if(!file){
        Alert.alert("Share Easy Alert","Please select file")
        return
      }
      setLoader(true)
      console.log("sending adta ", data)
      let formData = new FormData()
      formData.append("file", { uri: file.uri, type: file.type, size: file.size, name: file.name });
      formData.append("isBurn", data.isBurn)
      formData.append("isProtected", data.isProtected)
      formData.append("password", data.password)
      const res = await createFile(formData)

      if (res && res.status === 200) {
        const { link } = await res.json()
        console.log("file upodaed", link)
        navigation.navigate("QRLink", { link })

      } else {
        showToast("Server error! Please try again")
      }
      setLoader(false)

    } catch (error) {
      console.warn(error);
      
    }
  }
  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 30 }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={cloud} style={{ width: 150, height: 150 }} />
        </View>
        <View>
        <FilePicker handleDocumentSelection={handleDocumentSelection} fileName={file?.name} />
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
          {loader?<Bubbles size={10} color="#FFF" />:<Text style={{ color: Colors.tried,fontFamily:"cursive",fontWeight:"700",fontSize:20 }}>Share</Text>}
          
        </TouchableHighlight>
        </View>
       
      </View>
    </ScrollView>
  );
}

export default FileShare;
