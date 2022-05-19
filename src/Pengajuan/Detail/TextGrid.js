import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const TextGrid = ({judul,isi}) => {
  return (
    <View style={tw`flex-row`}>
        <Text style={[tw`mt-4 w-2/5 text-gray-500 text-xs`]}>{judul} </Text>
        <Text style={[tw`mt-4  text-xs`]}>{isi}</Text>   
    </View>
  )
}

export default TextGrid