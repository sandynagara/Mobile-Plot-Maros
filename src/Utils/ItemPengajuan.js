import { View, Text,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import tw from 'twrnc';

const ItemPengajuan = ({navigation,data}) => {

    const [status, setStatus] = useState(0)

    const convertProgress = (progress) => {
        if(progress == "diajukan"){
            setStatus(1)
        }else if(progress == "diproses"){
            setStatus(2)
        }else if(progress == "terverifikasi"){
            setStatus(3)
        }else if(progress == "selesai"){
            setStatus(4)
        }
    }

    useEffect(() => {
        convertProgress(data["status"])
    }, [data])
    
  return (
    
    <View style={tw`p-4 bg-white border-gray-200 border-2 rounded-md mt-2`}>
        <Pressable
            onPress={()=>{
                navigation.navigate('Detail Pengajuan', {
                    data: data["id"],
                });
            }}>
            <Text style={tw`font-bold text-lg`}>{data["nib"]}</Text>
            <Text style={tw``}>{data["tanggal"]}</Text>
            <View style={tw`flex-row mt-2`}>
                <View style={[tw`bg-black w-1/4 h-2` ]}/>
                <View style={[tw`bg-gray-300 w-1/4 h-2`,status >= 2 && tw`bg-red-500`]}/>
                <View style={[tw`bg-gray-300 w-1/4 h-2`,status >= 3 && tw`bg-yellow-500`]}/>
                <View style={[tw`bg-gray-300 w-1/4 h-2`,status >= 4 && tw`bg-green-500`]}/>
            </View>
            <Text 
            style={[tw`mt-2 text-black font-bold`
                ,status == 2 ? tw`text-red-500`:
                status == 3 ? tw`text-yellow-500`:
                status == 4 && tw`text-green-500`
            ]}>{data["status"]}</Text>
        </Pressable>
    
    </View>
 
  )
}

export default ItemPengajuan