import { View, Text,Modal,Pressable } from 'react-native'
import React,{useState} from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';

const Popup = ({pesan,type,setModalVisible,modalVisible}) => {

  
  return (  
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`justify-center items-center h-full w-full`}>
          <View style={[tw`bg-white p-6 rounded-md justify-center items-center`,{shadowRadius:4,shadowOpacity:0.25,elevation:5,shadowColor:"black"}]}>
            {type ? <Icon name="check" size={40} color="green"/> : <Icon name="close" size={40} color="red"/>}
            <Text style={[tw`font-semibold mt-5`,{fontSize:17}]}>{pesan}</Text>
            <Pressable
              style={[tw`bg-sky-500 rounded-md mt-5`]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={tw`text-white px-4 py-2`}>Oke</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

export default Popup