import { View, Text,Image} from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewImage = ({image}) => {
  console.log(image,"image")
  return (
    <View style={[tw` mt-2 bg-gray-50 rounded-md items-center`]}>
        <View style={tw``}>
            <Image source={{ uri: image.uri }} style={[tw`mt-2 px-2 `,{width: 400,height: 300,resizeMode:"contain" }]} />
        </View>
        {/* <View style={[tw`flex-row items-center bg-gray-200 w-full p-2 justify-start`]}>
            <Icon name="file-image" size={30} color="red" />
            <Text style={tw`ml-2 font-bold`}>{image.name}</Text>
        </View> */}
    </View>
  )
}

export default ViewImage