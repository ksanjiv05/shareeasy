import React from 'react';
import { View, Text, TouchableHighlight, Share, ToastAndroid } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import { Colors } from '../configs/config';

function QRLink({ route }) {
  const { link = "" } = route.params;
  console.log("params ", route.params, "--", link)
  const handleCopy = (text) => {
    Clipboard.setString(text)
    ToastAndroid.show("link copied", ToastAndroid.SHORT)
    console.log("hiii", text)
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'EasyShare | Share this link to client ' + link,
        url: "https://us.123rf.com/450wm/massonforstock/massonforstock1111/massonforstock111100136/11147955-girl-sitting-near-tree-with-vintage-camera-photo-in-old-yellow-color-image-style-.jpg?ver=6"
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <QRCode value={link} size={220} />
      <TouchableHighlight onPress={() => handleCopy(link)} underlayColor="none"  >
        <View
          style={{
            marginVertical: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            elevation: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{ color: Colors.primary, fontSize: 18, fontStyle: 'italic' }}>
            {link}
          </Text>
          <Icon
            name="content-copy"
            style={{ fontSize: 18, marginLeft: 10 }}
            color={Colors.primary}
          />
        </View>
      </TouchableHighlight>
      <View>
        <TouchableHighlight onPress={onShare}>
          <Icon
            name="share"
            style={{ fontSize: 38, marginVertical: 10 }}
            color={Colors.primary}

          />
        </TouchableHighlight>

      </View>
    </View>
  );
}

export default QRLink;
