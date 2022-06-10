import { View, Text,KeyboardAvoidingView,ScrollView,ActivityIndicator,Pressable } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import tw from 'twrnc';
import configData from "../config/config.json"
import InputData from '../Utils/InputData';
import InputImage from '../Utils/InputImage';
import ViewImage from '../Utils/ViewImage';
import Popup from '../Utils/Popup';
import CameraInput from '../Utils/CameraInput';
import PopupQusetion from '../Utils/PopupQuestion';

const DataDiri = ({navigation}) => {

    const [namaLengkap, setNamaLengkap] = useState("");
    const [nik, setNIK] = useState("");
    const [telepon, setTelepon] = useState("");
    const [fotoSelfie, setFotoSelfie] = useState(null);
    const [fotoKTP, setFotoKTP] = useState(null);
    const [fotoTandaTangan, setFotoTandaTangan] = useState(null);

    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [result,setResult] = useState(false)

    const [modalVisibleQuestion, setModalVisibleQuestion] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const url = `${configData.Developer_API}profil`
        fetch(url).then((res)=>res.json()).then(res=>{
            setNamaLengkap(res["data"]["nama"])
            setNIK(res["data"]["nik"])
            setTelepon(res["data"]["telepon"])
            var id = res["data"]["id"]
            if(res["data"]["ktp_name"]){
                const urlKtp = configData.Developer_API+`profil/foto/${id}&${res["data"]["ktp_name"]}`
                setFotoKTP({
                    ganti:false,
                    uri:urlKtp
                })
            }else{
                setFotoKTP(false)
            }

            if(res["data"]["selfie_name"]){
                const urlSelfie = configData.Developer_API+`profil/foto/${id}&${res["data"]["selfie_name"]}`
                setFotoSelfie({
                    ganti:false,
                    uri:urlSelfie
                })
            }else{
                setFotoSelfie(false)
            }

            if(res["data"]["tanda_tangan_name"]){
                const urlTandatangan = configData.Developer_API+`profil/foto/${id}&${res["data"]["tanda_tangan_name"]}`
                setFotoTandaTangan({
                    ganti:false,
                    uri:urlTandatangan
                })
            }else{
                setFotoTandaTangan(false)
            }
            
        }).catch(err=>console.log(err))
    }, [])

    useEffect(() => {
      if(update){
          updateProfile()
      }
    }, [update])
    

    const updateProfile = () => {
        setLoading(true)
        var body = new FormData();
        body.append('nama',namaLengkap)
        body.append('nik',nik)
        body.append('telepon',telepon)
        if(fotoKTP && fotoKTP["ganti"]){
            body.append('ktp', {uri: fotoKTP.uri,name: 'ktp.jpg',filename :'imageName.png',type: 'image/jpg'});
        }
        if(fotoSelfie && fotoSelfie["ganti"]){
            body.append('selfie', {uri: fotoSelfie.uri,name: 'selfie.jpg',filename :'imageName.png',type: 'image/jpg'});
        }
        if(fotoTandaTangan && fotoTandaTangan["ganti"]){
            body.append('tanda_tangan', {uri: fotoTandaTangan.uri,name: 'tanda_tangan.jpg',filename :'imageName.png',type: 'image/jpg'});
        }
    
        const url = configData.Developer_API+"profil"
        fetch(url,{
            method:"PATCH",
            headers: {'Content-Type': 'multipart/form-data'},
            body:body,
            credentials: 'include'
        }).then(res=>res.json()).then(res=>{
            setLoading(false)
            setModalVisible(true)
            setResult(res)
            setUpdate(false)
        }).catch(err=>{
            setModalVisible(true)
            setLoading(false)
            setUpdate(false)
        })
    }

    const getSignature = () => {
        navigation.navigate("Signature",{handleItem: (item) => setFotoTandaTangan({ganti:true,uri:item})})
    }

  return (  
    <View style={[tw`h-full w-full py-2`]}>
       
        <ScrollView style={tw`px-4`}>
            
            {/* <InputData judul="Username" margin={"mt-2 font-bold"}/>
            <InputData judul="Password" margin={"mt-2  font-bold"} pass={true}/> */}
            <InputData judul="Nama Lengkap" text={namaLengkap} setText={setNamaLengkap} margin={"mt-2  font-bold"}/>
            <InputData judul="NIK" text={nik} setText={setNIK} margin={"mt-2  font-bold"}/>
            <InputData judul="Nomor Telepon" text={telepon} setText={setTelepon} margin={"mt-2  font-bold"}/>
            
            <Text style={[tw`font-bold mt-4 `]}>Foto KTP</Text>
            {fotoKTP && <ViewImage image={fotoKTP}/>} 
            <InputImage setImage={setFotoKTP}/>

            <Text style={[tw`font-bold mt-2`]}>Foto Selfie</Text>
            {fotoSelfie &&  <ViewImage image={fotoSelfie}/>} 
            <CameraInput setImage={setFotoSelfie}/>

            <Text style={[tw`font-bold mt-2`]}>Tanda Tangan</Text>
            {fotoTandaTangan &&  <ViewImage image={fotoTandaTangan}/>} 

            <Pressable onPress={()=>{getSignature()}}>
                <View style={[tw`w-full mt-2  bg-gray-200 items-center p-3 rounded-md flex-row justify-center`]}>
                    <Text style={[tw`text-gray-500  font-bold ml-3` ]}>Ambil Tanda Tangan</Text>
                </View>
            </Pressable>
            
        </ScrollView>
        <KeyboardAvoidingView
        behavior="position"
        enabled={false}
        >   
            <Pressable style={[tw`px-4`]} onPress={()=>setModalVisibleQuestion(true)}>
            <View style={[tw`w-full mt-2 bg-sky-500 items-center p-3 rounded-md`]}>
                  {loading ? <ActivityIndicator color="#ffffff"/> : <Text style={[tw`text-white font-bold` ]}>SIMPAN</Text>}
            </View>
        </Pressable>
        <PopupQusetion modalVisible={modalVisibleQuestion} setModalVisible={setModalVisibleQuestion} setUpload={setUpdate}/>
        <Popup modalVisible={modalVisible} pesan={result["MSG"]} type={result["RTN"]} setModalVisible={setModalVisible} />
        </KeyboardAvoidingView> 
        
    </View>
  )
}

export default DataDiri