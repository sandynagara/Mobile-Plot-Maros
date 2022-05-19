import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const Pengumuman = () => {
  return (
    <View style={tw`bg-sky-400 w-full rounded-md py-5 px-3`}>
      <Text style={tw`text-white font-bold text-xl`}>Pengumuman</Text>
      <View style={tw`bg-white rounded-md mt-4 p-2`}>
        <Text style={tw`text-black font-bold m-1`}>Data diri belum diisi</Text>
      </View>
    </View>
  )
}

export default Pengumuman