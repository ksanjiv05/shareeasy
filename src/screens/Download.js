import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';


import {Colors} from '../configs/config';

function Download({route, navigation}) {
  const {token = '', fileName} = route.params;

  const handleDownload = () => {
    console.log("______",token , fileName)
    if (Platform.OS === 'ios') {
      downloadHistory();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'storage title',
            message: 'storage_permission',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted.');
            downloadHistory();
          } else {
            Alert.alert('storage_permission');
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
      }
    }
  };

  const downloadHistory = async () => {
    const {config, android, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/' + fileName,
        description: 'Risk Report Download',
      },
    };
    config(options)
      .fetch('GET', 'http://134.255.216.211:3001/api/getFile', {
        Authorization: token,
      })
      .then(res => {
       
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
       
      });

    // RNFetchBlob.config({
    //   addAndroidDownloads : {
    //     useDownloadManager : true,
    //     title : 'awesometrtghhjgvhjhgvhcghcgchgc.png',
    //     description : 'An APK that will be installed',
    //     mime : 'application/vnd.android.package-archive',
    //     mediaScannable : true,
    //     notification : true,
    //   }
    // })
    // .fetch('GET', `http://134.255.216.211:3001/api/getFile`,{Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlSWQiOiJCb0l5Q2EiLCJpYXQiOjE2NDk2MTgyNDIsImV4cCI6MTY0OTYyMTg0Mn0.GX2BFDNtmjobjUodsffyNpKtvRZxWain0S_QL8ApodI"})
    // .then((res) => {
    //     android.actionViewIntent(res.path(), 'application/vnd.android.package-archive')
    // })
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'center'}}>
      <Text
        style={{
          color: Colors.primary,
          padding: 15,
          borderColor: Colors.primary,
          marginVertical: 5,
          borderWidth: 1,
          borderRadius: 5,
          borderStyle:"dashed",
          textAlign:"center"
        }}>
        {fileName}
      </Text>

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
        onPress={handleDownload}>
        <Text style={{color: Colors.secondry}}>Download</Text>
      </TouchableHighlight>
    </View>
  );
}

export default Download;
