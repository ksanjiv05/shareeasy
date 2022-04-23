import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../configs/config';

function FilePicker({handleDocumentSelection,fileName}) {
  console.log("++++++",fileName)
  return (
    <TouchableOpacity
      onPress={handleDocumentSelection}
      style={{
        borderColor: Colors.primary,
        borderWidth: 2,
        borderStyle: 'dashed',
        flex: 1,
        minHeight: 150,
        borderRadius: 10,

        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="file-upload"
        style={{fontSize: 60}}
        color={Colors.primary}
      />
      <Text style={{color: Colors.primary}}>{fileName===undefined?"upload your file":fileName}</Text>
    </TouchableOpacity>
  );
}

export default FilePicker;
