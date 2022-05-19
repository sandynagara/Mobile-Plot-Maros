import { View, Text,LogBox } from 'react-native'
import React,{useEffect,useState} from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';
import MapView,{Marker,Polyline} from "react-native-maps";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as Location from 'expo-location';
import Information from '../Utils/Information';

const Peta = ({navigation,route,koordinatPolygonInput=false}) => {

  const [location, setLocation] = useState({latitude :-5.134054,longitude :119.444510})
  const [daftarKoordinat, setDaftarKoordinat] = useState(route.params.daftarKoordinatInput)
  const [koordinatPolygon, setKoordinatPolygon] = useState(koordinatPolygonInput)
  const [change, setChange] = useState(false)
  const [info, setInfo] = useState(true)

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(async () => {
    console.log(daftarKoordinat)
    var { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    if(daftarKoordinat.length>2){
      setLocation(daftarKoordinat[0]["koordinat"])
    }
  }, [])

  useEffect(() => {
    if(daftarKoordinat.length>2){
      var listKoordinat = []
      daftarKoordinat.map((e)=>{
        listKoordinat.push(e["koordinat"])
      })
      listKoordinat.push(daftarKoordinat[0]["koordinat"])
      setKoordinatPolygon(listKoordinat)
      
    }
  }, [daftarKoordinat,change])
  
  
  const getCoordinate = async() => {
    var id = "id" + Math.random().toString(16).slice(2)
    var posisi = await Location.getCurrentPositionAsync({});
    var koordinat = {
      id:id,
      koordinat:{latitude:posisi["coords"]["latitude"],longitude:posisi["coords"]["longitude"]}
    }
    console.log(daftarKoordinat,"daftar")
    var listKoordinat = daftarKoordinat.concat(koordinat)
    setLocation(koordinat["koordinat"])
    setDaftarKoordinat(listKoordinat)
  }

  const editMarker = (e,id) => {
    var listKoordinat = daftarKoordinat
    daftarKoordinat.map((data,index)=>{
      if(data["id"] === id){
        listKoordinat[index]["koordinat"] = e
      }
    })
    setChange(!change)
    setLocation(e)
    setDaftarKoordinat(listKoordinat)
  }

  return (
    <View style={[tw`w-full h-full justify-center items-center`]}>
       <MapView
        style={tw`w-full h-full absolute`}
        //specify our coordinates.
        initialRegion={{
          latitude: -5.134054, 
          longitude: 119.444510,
          latitudeDelta:  0.0002,
          longitudeDelta: 0.0002,
        }}
        region={{
          latitude: location["latitude"], 
          longitude: location["longitude"],
          latitudeDelta:  0.0002,
          longitudeDelta: 0.0002,
        }}
        mapType={"satellite"}
      >
        {daftarKoordinat.length > 0 && daftarKoordinat.map((koordinat,index)=>{
          return (
            <Marker 
            coordinate={koordinat["koordinat"]} 
            key={index}
            draggable
            onDragEnd={e=>editMarker(e.nativeEvent.coordinate,koordinat["id"])}
            />
          )
        })}
        {daftarKoordinat.length > 2 && koordinatPolygon && <Polyline coordinates={koordinatPolygon} strokeColor="red"/>}
      </MapView>
      <View style={tw`absolute bottom-0 w-full bg-white p-2`}>
        <View style={[tw`flex-row w-full`,{maxWidth:"100%"}]}>
          <Pressable 
            style={tw`bg-black px-2 w-1/8 rounded-md border-2 border-gray-200 justify-center `}  
            onPress={()=>{setInfo(true)}}
            >
            <Icon name="info" size={25} color="white" />
          </Pressable>
          <Pressable 
            style={[tw`ml-4 bg-white w-10/12 py-3 rounded-md border-2 border-gray-200`,{alignSelf: 'stretch'}]} 
            onPress={getCoordinate}>
            <Text style={tw`text-black text-center font-bold`}>Ambil Koordinat</Text>
          </Pressable>
          
        </View>
        <Pressable 
          style={[tw`bg-sky-500 py-3 w-full rounded-md mt-2`,daftarKoordinat.length < 3 && tw`bg-gray-300`]} 
          onPress={()=>{
            if(daftarKoordinat.length > 2){
              route.params.handleItem(daftarKoordinat)
              navigation.goBack()
            } 
          }}>
          <Text style={tw`text-white text-center font-bold`}>Simpan</Text>
        </Pressable>
      </View>
      {info && <Information setInfo={setInfo}/>}
      
    </View>
  )
}

export default Peta