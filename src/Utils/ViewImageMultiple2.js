import { View,Image,ScrollView,Pressable,Modal} from 'react-native'
import React,{useState} from 'react'
import tw from 'twrnc';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewImageMultiple2 = ({data}) => {
  

return (
  <View>
      <ScrollView horizontal={true}>
      <View style={tw`flex-row mt-2`}>
          {data && data.map((image,index)=>{
              return (
              <Pressable
                  key={index}
              >
                  <Image style={[tw`w-20 h-20 rounded-md mr-1`,{resizeMode:"cover" }]} source={{uri:image.uri}}/>
              </Pressable>)
                  
          })}
      </View>
      </ScrollView>
     
  </View>)
}

export default ViewImageMultiple2