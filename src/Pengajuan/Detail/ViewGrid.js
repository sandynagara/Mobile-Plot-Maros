import { View, Text,ScrollView ,Image, Pressable,Modal} from 'react-native'
import React,{useState} from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import tw from 'twrnc';
import configData from '../../config/config.json';

const ViewGrid = ({data,id,judul}) => {
    const [image, setImage] = useState(false)
    const [open, setOpen] = useState(false)

  return (
    <View>
        <Text style={[tw`mt-4 mb-2 w-2/5 text-gray-500 text-xs`]}>{judul}</Text>
        <ScrollView horizontal={true}>
        <View style={tw`flex-row`}>
            {data && data.map((image,index)=>{
                return (
                <Pressable
                    onPress={()=>{
                        setImage([{url:configData.Developer_API+"pengajuan/image/"+id+"&"+image}])
                        setOpen(true)
                    }}
                    key={index}
                >
                    <Image style={[tw`w-20 h-20 rounded-md mr-1`,{resizeMode:"cover" }]} source={{uri:configData.Developer_API+"pengajuan/image/"+id+"&"+image}}/>
                </Pressable>)
                    
            })}
            <Modal visible={open} transparent={true} onRequestClose={()=>setOpen(false)}>
                <ImageViewer imageUrls={image}/>
            </Modal>
        </View>
        </ScrollView>
       
    </View>
  )
}

export default ViewGrid