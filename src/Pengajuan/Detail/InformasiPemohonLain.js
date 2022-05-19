import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import TextGrid from './TextGrid';
import ViewGrid from './ViewGrid';

const InformasiPemohonLain = ({data}) => {
  return (
    <View style={[tw`p-4 bg-white mt-3`]}>
        <Text style={[tw`font-bold`]}>Informasi Pemberi Kuasa</Text>
        <TextGrid judul={"nama"} isi={data["nama_kuasa"]}/>
        <ViewGrid data={[data["ktp_kuasa"]]} id={data["id"]} judul={"Ktp"}/>
        <ViewGrid data={[data["selfie_kuasa"]]} id={data["id"]} judul={"Selfie"}/>
        <ViewGrid data={data["surat_kuasa"]} id={data["id"]} judul={"Surat Kuasa"}/>
    </View>
  )
}

export default InformasiPemohonLain