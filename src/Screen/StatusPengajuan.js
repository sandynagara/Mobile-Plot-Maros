import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import tw from 'twrnc';
import ItemPengajuan from '../Utils/ItemPengajuan';
import configData from "../config/config.json"

const StatusPengajuan = ({navigation}) => {

  const [data, setData] = useState(false)

  useEffect(() => {
    const url = configData.Developer_API + "pengajuan"
    fetch(url,{
      method:"GET",
      credentials:"include"
    }).then(res=>res.json()).then(res=>{
      console.log(res,"json")
      setData(res)
    }).catch((err)=>console.log(err))
  }, [])
  

  return (
    <View style={tw`px-2 bg-white h-full`}>
        {data && data.length != 0 ? data.map((progress,index)=>{
          return  <ItemPengajuan key={index} data={progress} navigation={navigation}/>
        }): 
        <View style={tw`p-4 bg-white border-gray-200 border-2 rounded-md mt-2`}>
            <Text style={tw`font-bold text-center`}>Anda tidak mempunyai pengajuan bidang tanah</Text>
        </View>
        }
    </View>
  )
}

export default StatusPengajuan