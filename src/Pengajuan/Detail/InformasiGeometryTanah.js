import { View, Text,LogBox } from 'react-native'
import React,{useEffect,useState} from 'react'
import tw from 'twrnc';
import TextGrid from './TextGrid';
import MapView,{Polygon} from "react-native-maps";
import ViewGrid from "./ViewGrid"

const InformasiGeometryTanah = ({data}) => {

    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);

    const [koordinat, setKoordinat] = useState(false)

    useEffect(() => {
      console.log(data)
      if(!data){
          return
      }

      var koordinat = []
      console.log()
      data["bidang_tanah"]["coordinates"][0][0].map(e=>{
          koordinat.push({latitude:e[1],longitude:e[0]})
      })
      koordinat.push({latitude:data["bidang_tanah"]["coordinates"][0][0][0][1],longitude:data["bidang_tanah"]["coordinates"][0][0][0][0]})
      setKoordinat(koordinat)
    }, [data])
    

  return (
    <View style={[tw`p-4 bg-white `]}>
       <Text style={[tw`font-bold `]}>Informasi Geometry Bidang Tanah</Text>
       <TextGrid judul={"Alamat"} isi={data["alamat_denah"]}/>
       <ViewGrid data={data["tempat"]} id={data["id"]} judul={"Foto Bidang Tanah"}/>
       <Text style={[tw`mt-4 w-2/5 text-gray-500 text-xs`]}>Bidang Tanah</Text>
       {data && 
         <MapView
         style={tw`w-full h-72 mt-2`}
         //specify our coordinates.
         initialRegion={{
           latitude: data["bidang_tanah"]["coordinates"][0][0][0][1], 
           longitude: data["bidang_tanah"]["coordinates"][0][0][0][0],
           latitudeDelta:  0.0002,
           longitudeDelta: 0.0002,
         }}
         mapType={"satellite"}
       >
        <Polygon coordinates={koordinat} fillColor='rgba(51,136,255,0.4)' strokeColor='rgba(51,136,255,0.8)'/>
         {/* {daftarKoordinat.length > 2 && koordinatPolygon && <Polyline coordinates={koordinatPolygon} strokeColor="red"/>} */}
       </MapView>
       }
      
    </View>
  )
}

export default InformasiGeometryTanah