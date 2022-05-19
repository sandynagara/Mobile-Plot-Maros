import { View, Text,TextInput } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const InputData = ({judul,margin,text="",setText=()=>{},pass=false}) => {


  return (
    <View>
      <Text style={[tw`${margin}`]}>{judul}</Text>
      <TextInput 
          style={[tw`bg-gray-200 text-black mt-2 py-2 px-3 w-full rounded-sm`]}
          placeholder={judul}
          secureTextEntry={pass}
          onChangeText={(text)=>setText(text)}
          value={text}
      />
    </View>
  )
}

export default InputData