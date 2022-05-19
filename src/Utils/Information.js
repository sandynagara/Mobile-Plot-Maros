import { View, Text, Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const Information = ({setInfo}) => {
  return (
    <View style={[tw`bg-white w-3/4 rounded-md`]}>
        <View style={[tw`p-3`]}>
          <Text style={[tw`font-bold`]}>Cara pengambaran : </Text>
          <Text style={[tw`mt-2 text-gray-500`]}>1. Berdiri di salah satu titik batas bidang</Text>
          <Text style={[tw`mt-2 text-gray-500`]}>2. Tekan tombol "Ambil koordinat"</Text>
          <Text style={[tw`mt-2 text-gray-500`]}>3. Tunggu hingga koordinat berhasil diambil dan marker berhasil ditambahkan</Text>
          <Text style={[tw`mt-2 text-gray-500`]}>4. Berpindah ke titik batas bidang yang lain</Text>
          <Text style={[tw`mt-2 text-gray-500`]}>5. Ulangi hingga semua titik batas terinput</Text>
          <Text style={[tw`mt-2 text-gray-500`]}>6. Jika koordinat yang diambil kurang sesuai, maka posisi batas dapat diedit dengan menekan marker lalu mengubah posisinya</Text>
        </View>
        <Pressable 
          style={[tw`w-full bg-sky-400 p-3`,{borderBottomEndRadius:7,borderBottomStartRadius:7}]}
          onPress={()=>setInfo(false)}
          >
          <Text style={[tw`text-white text-center font-bold`]}>Saya Mengerti !</Text>
        </Pressable>
    </View>
  )
}

export default Information