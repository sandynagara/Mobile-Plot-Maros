import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import TextGrid from './TextGrid';

const InformasiPengajuan = ({data}) => {
  return (
    <View style={[tw`p-4 bg-white`]}>
      <Text style={[tw`font-bold`]}>Informasi Pengajuan</Text>
      <TextGrid judul={"Tanggal"} isi={data["tanggal"]}/>
      <View style={tw`flex-row`}>
        <Text style={[tw`mt-4 w-2/5 text-gray-500 text-xs`]}>Status </Text>
        <Text style={[tw`mt-4  text-xs font-bold`]}>{data["status"]}</Text>   
      </View>
      {data["petugas_cek_date"] && 
        <View style={tw`flex-row`}>
          <Text style={[tw`mt-4 w-2/5 text-gray-500 text-xs`]}>Diproses pada </Text>
          <Text style={[tw`mt-4  text-xs`]}>{data["petugas_cek_date"]}</Text>   
        </View>
      }
      {data["petugas_pencatat_date"] && 
        <View style={tw`flex-row`}>
          <Text style={[tw`mt-4 w-2/5 text-gray-500 text-xs`]}>Diverifikasi pada </Text>
          <Text style={[tw`mt-4  text-xs `]}>{data["petugas_pencatat_date"]}</Text>   
        </View>
      }
      
    </View>
  )
}

export default InformasiPengajuan