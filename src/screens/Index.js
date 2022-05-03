import React from 'react';
import {ImageBackground, Text, Pressable} from 'react-native';
import img from '../statics/animation_500_l1pzjxad.gif';
import img1 from '../statics/a2.gif';
import img2 from '../statics/a5.gif';
import {Colors} from '../configs/config'

function Index({navigation}) {
  const [imgCount, setImgCount] = React.useState(1);
  return (
    <ImageBackground
      source={imgCount === 1 ? img : imgCount === 2 ? img1 : img2}
      resizeMode="contain"
      style={{justifyContent: 'flex-end', flex: 1, marginHorizontal: 15}}>
      <Text style={{textAlign: 'center', marginBottom: 90,color:Colors.primary,fontFamily:"cursive",fontWeight:"700",fontSize:23}}>
        {imgCount === 1
          ? 'Easy to transfer files'
          : imgCount === 2
          ? 'You can share file with end to end encryption'
          : 'Share your genrated link or QR to anybody'}
      </Text>
      <Pressable
        onPress={() => navigation.navigate('Tab')}
        style={{position: 'absolute', top: 10, right: 10}}>
        <Text style={{color: Colors.primary,fontFamily:"cursive",fontWeight:"700",fontSize:18}}>Skip</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          imgCount === 3 ? setImgCount(1) : setImgCount(imgCount + 1)
        }
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          backgroundColor: Colors.primary,
          paddingHorizontal: 40,
          paddingVertical: 15,
          borderRadius: 40,
          fontWeight: '600'
        }}>
        <Text style={{color: 'white',fontSize:15,fontFamily:"cursive",fontWeight:"700"}}>Next</Text>
      </Pressable>
    </ImageBackground>
  );
}

export default Index;
