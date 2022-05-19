import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import TextGrid from './TextGrid';
import ViewGrid from './ViewGrid';

const InformasiStatus = ({data}) => {
  return (
    <View style={[tw`p-4 bg-white my-3`]}>
        <Text style={[tw`font-bold `]}>Informasi Bidang Tanah</Text>
        <TextGrid judul={"Jenis Hak"} isi={data["hak"]}/>
        <TextGrid judul={"Nomor Surat Ukur"} isi={data["nomor_surat"]}/>
        <TextGrid judul={"NIB"} isi={data["nib"]}/>
        <TextGrid judul={"Peruntukan"} isi={data["peruntukan"]}/>
        <ViewGrid data={data["sertifikat"]} id={data["id"]} judul={"Sertifikat"}/>
        <ViewGrid data={data["pbb"]} id={data["id"]} judul={"PBB"}/>
        <ViewGrid data={data["stts"]} id={data["id"]} judul={"STTS"}/>
        <ViewGrid data={data["akta_jual_beli"]} id={data["id"]} judul={"Akta Jual Beli"}/>
        {data["surat_warisan"] &&   <ViewGrid data={data["surat_warisan"]} id={data["id"]} judul={"Surat Warisan"}/>}
    </View>
  )
}

export default InformasiStatus