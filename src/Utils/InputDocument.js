import { View, Text,Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import * as DocumentPicker from 'expo-document-picker';

const InputDocument = ({setFile}) => {

    const pickDocument = async () => {
        // No permissions request is necessary for launching the image library
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
        });
        
        if (!result.cancelled) {
            setFile(result)
        }
    };

  return (
    <Pressable onPress={()=>pickDocument()}>
        <View style={[tw`w-full mt-2  bg-gray-200 items-center p-3 rounded-md`]}>
            <Text style={[tw`text-gray-500  font-bold` ]}>Pilih document (.pdf)</Text>
        </View>
    </Pressable>
  )
}

export default InputDocument