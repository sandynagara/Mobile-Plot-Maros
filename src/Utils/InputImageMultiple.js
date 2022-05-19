import { View, Text, Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';

const InputImageMutiple = ({navigation,setImage}) => {

    const moveImageMulitple = () => {
        navigation.navigate("ImageBrowser",
            {handleItem: (item) => setImage(item)})
    }

  return (
    <Pressable onPress={moveImageMulitple}>
        <View style={[tw`w-full mt-2  bg-gray-200 items-center p-3 rounded-md flex-row justify-center`]}>
            <Icon name="camera" size={18} color="gray" />
            <Text style={[tw`text-gray-500  font-bold ml-3` ]}>Ambil foto</Text>
        </View>
    </Pressable>
  )
}

export default InputImageMutiple