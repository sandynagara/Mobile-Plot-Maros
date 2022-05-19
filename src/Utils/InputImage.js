import { View, Text, Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

const InputImage = ({setImage}) => {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
  
        
        if (!result.cancelled) {
          console.log(result)
            setImage({
              ganti:true,
              uri:result.uri
            })
        }
    };

  return (
    <Pressable onPress={()=>{pickImage()}}>
        <View style={[tw`w-full mt-2  bg-gray-200 items-center p-3 rounded-md flex-row justify-center`]}>
            <Icon name="camera" size={18} color="gray" />
            <Text style={[tw`text-gray-500  font-bold ml-3` ]}>Ambil foto</Text>
        </View>
    </Pressable>
  )
}

export default InputImage