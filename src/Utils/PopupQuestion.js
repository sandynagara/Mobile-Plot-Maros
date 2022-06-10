import { View, Text,Modal,Pressable } from 'react-native'
import React,{useState} from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';

const PopupQusetion = ({setModalVisible,modalVisible,setUpload}) => {

  return (  
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`justify-end items-center h-full w-full bg-black bg-opacity-40`}>
          <View style={[tw`bg-white w-full px-5  rounded-md justify-center items-center`,{shadowRadius:4,shadowOpacity:0.25,elevation:5,shadowColor:"black"}]}>
            <Text style={[tw`font-bold mt-6`,{fontSize:17}]}>Apa data yang anda kirimkan sudah benar?</Text>
            <View style={tw`flex-row justify-between w-full pb-5`}>
                <Pressable
                style={[tw`bg-red-500 font-semibold rounded-md mt-5 w-1/2 mr-1 flex justify-center items-center`]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={tw`text-white`}>Cancel</Text>
                </Pressable>
                <Pressable
                style={[tw`bg-sky-500 font-semibold rounded-md mt-5 w-1/2 ml-1  flex justify-center items-center`]}
                onPress={() => {
                    setModalVisible(!modalVisible)
                    setUpload(true)
                }}
                >
                <Text style={tw`text-white px-10 py-4`}>Ya</Text>
                </Pressable>
            </View>

          </View>
        </View>
      </Modal>
  )
}

export default PopupQusetion