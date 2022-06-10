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
            <Picker.Item label="Hak Milik" value="milik"  />
            <Picker.Item label="Hak Guna Bangunan" value="guna bangunan" />
            <Picker.Item label="Hak Pakai" value="pakai" />
            <Picker.Item label="Hak Guna Usaha" value="guna usaha" />
            <Picker.Item label="Hak Sewa" value="sewa" />
        </Picker>
        </View>
    </View>
  )
}

export default Select