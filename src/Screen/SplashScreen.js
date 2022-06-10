import react,{useEffect} from 'react';
import { View, Text,Image } from 'react-native'
import Logo from "../images/Logo.png"
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'

const SplashScreen = ({navigation }) => {

    useEffect(() => {
      setTimeout(async()=>{
          const value = await AsyncStorage.getItem('logged')
          if(value === null){
            navigation.navigate('Login')
          }else{
            navigation.navigate('Home')
          }
      },3000)
    }, [])
    
  return (
    <View style={tw`items-center justify-center h-full`}>
        <Image source = {Logo}
        style = {[tw`mr-4`,{ width: 200, height: 200 }]}
    />
      <Text style={tw`text-lg font-medium mt-11 text-center`}>Kantor Pertanahan</Text>
      <Text style={tw`text-lg font-medium mt-1 text-center`}>Kabupaten Maros</Text>
    </View>
  )
}

export default SplashScreen