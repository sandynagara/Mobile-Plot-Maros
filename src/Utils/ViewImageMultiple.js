import { View, Text,Image} from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewImageMultiple = ({image}) => {
  return (
    <View style={[tw` mt-2 bg-gray-100 rounded-md items-center`]}>
        <View style={[tw`flex-row items-center bg-gray-200 w-full p-2 justify-start`]}>
            <Icon name="file-image" size={30} color="red" />
            <Text style={tw`ml-2 font-bold`}>{image.name}</Text>
        </View>
        
    </View>
  )
}

export default ViewImageMultiple