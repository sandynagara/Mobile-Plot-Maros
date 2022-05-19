import { View, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React,{useState} from 'react'
import tw from 'twrnc';

const Select = ({select, setSelect}) => {

  return (
    <View>
        <Text>Jenis Hak</Text>
        <View style={tw`bg-gray-200 mt-2 `}>
        <Picker
            selectedValue={select}
            onValueChange={(itemValue, itemIndex) =>
                setSelect(itemValue)
            }
            style={[tw`text-black  w-full rounded-sm`]}
        >
            <Picker.Item label="Milik" value="milik"  />
            <Picker.Item label="Sewa" value="sewa" />
        </Picker>
        </View>
    </View>
  )
}

export default Select