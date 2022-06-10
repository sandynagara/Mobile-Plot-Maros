import { View } from 'react-native'
import React,{useState,useEffect} from 'react'
import Menu from '../HomeScreen/Menu'
import tw from 'twrnc';
import Header from '../HomeScreen/Header';
import Footer from '../Footer/Footer';
import form from "../images/icon_form.png"
import status from "../images/icon_status.png"
import send from "../images/icon_send.png"
import configData from "../config/config.json"

const Home = ({navigation}) => {

  const [pilih, setPilih] = useState(false)
  const [data, setData] = useState(false)
  
  useEffect(() => {
    if(pilih){
      navigation.navigate(pilih)
      setPilih(false)
    }
  }, [pilih])

  useEffect(() => {
    const url = configData.Developer_API +"userOne"
    fetch(url,{
      method:"GET",
      credentials:"include"
    }).then(res=>res.json()).then(res=>{
      console.log(res)
      setData(res)
    }).catch(err=>console.log(err))
  }, [])
  
  

  return (
    <View style={tw`h-full w-full pt-10 flex-col`}>
      <Header data={data} navigation={navigation}/>
      <View style={[tw`p-2`]}>
  
        <View style={tw`px-2`}> 
            <Menu icon={form} judul="Data diri" color='bg-green-500' color2='bg-green-200' setPilih={setPilih}/>
            <Menu icon={send} judul="Pengajuan" color='bg-red-500' color2='bg-red-200' setPilih={setPilih}/>
            <Menu icon={status} judul="Status Pengajuan" color='bg-blue-500' color2='bg-blue-200' setPilih={setPilih}/>
        </View>
      </View>
      <Footer/>
    </View>
  )
}

export default Home