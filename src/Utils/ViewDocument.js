import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewDocument = ({document}) => {
  return (
    <View style={[tw`p-3 mt-2 bg-gray-100 rounded-md flex-row items-center`]}>
        <Icon name="file-pdf-box" size={30} color="red" />
        <Text style={tw`ml-2`}>{document.name}</Text>
    </View>
  )
}

export default ViewDocument