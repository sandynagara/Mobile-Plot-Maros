import { View, Text,Image } from 'react-native'
import React from 'react'
import Logo from "../images/Logo.png"
import tw from 'twrnc';

const Footer = () => {
  return (
    <View style={tw`items-center justify-center w-full bottom-4 absolute flex-row`}>
        <Image source = {Logo}
        style = {[tw`mr-2`,{ width: 30, height: 30 }]}
        />
        <Text style={tw`font-bold`}>
            Cek Plot
        </Text>
    </View>
  )
}

export default Footer