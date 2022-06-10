import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({data,navigation}) => {

  const logOut = async() => {
    await AsyncStorage.removeItem('logged')
    navigation.navigate('Login')
  }

  console.log(data,"data")

  return (
    <View style={tw`w-full px-4 py-3 bg-white flex-row items-center`}>
        <Icon name="user" size={35} color="black"/>
      <Text style={tw`font-bold text-lg ml-2`}>{data && data["MSG"] !== null &&  data["MSG"]["nama"]}</Text>

          <Icon2 name="logout" size={20} color="red" style={tw`absolute right-5`} onPress={logOut}/>
  
    </View>
  )
}

export default Header