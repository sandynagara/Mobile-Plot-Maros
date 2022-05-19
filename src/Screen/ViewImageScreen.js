import { View, Text,Image,ScrollView,Modal } from 'react-native'
import React,{useEffect,useState} from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import tw from 'twrnc';

const ViewImageScreen = ({route}) => {

    const [data, setData] = useState()

    useEffect(() => {
      console.log(route,"route")
      setData(route["params"]["image"])
    }, [])

    const images = [{
        // Simplest usage.
        url: data,
     
        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance
     
        // You can pass props to <Image />.
        props: {
            // headers: ...
        }
    }]
    

  return (
    <View>
       <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={images}/>
                <Text>sdadsas</Text>
            </Modal>
     
    </View>
  )
}

export default ViewImageScreen