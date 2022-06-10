import { View, Text,Image,Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const Menu = ({icon,judul="",color="bg-yellow-700",setPilih,color2="bg-yellow-200"}) => {

  var size = 50
  
  return (
    <Pressable onPress={()=>setPilih(judul)}>
      <View style = {[tw`text-center flex-row  my-2 p-3 rounded-md`,tw`${color2}`]}>
        <View style={[tw`p-4 rounded-md`,tw`${color}`]}>
          <Image source = {icon}
            style = {[tw``,{ width: size, height: size }]}
          />
        </View>
        <View style = {[tw`justify-center ml-8 w-1/2`]}>
          <Text style={[tw`text-gray-600 font-bold`,{fontSize:17}]}>{judul}</Text>
        </View> 
      </View>
    </Pressable>
  )
}

export default Menu