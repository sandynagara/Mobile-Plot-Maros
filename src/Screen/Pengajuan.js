import { View, Text,ScrollView,Pressable,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import tw from 'twrnc';
import InputData from '../Utils/InputData'
import configData from "../config/config.json"
import InputImage from '../Utils/InputImage';
import ViewImage from '../Utils/ViewImage';
import ViewImageMultiple from '../Utils/ViewImageMultiple';
import InputImageMutiple from '../Utils/InputImageMultiple';
import Select from '../Utils/Select';
import Popup from '../Utils/Popup';
import ViewImageMultiple2 from '../Utils/ViewImageMultiple2';

const Pengajuan = ({navigation}) => {

    const [kuasa, setKuasa] = useState("Sendiri")
    const [jenisHak, setJenisHak] = useState("Milik")
    const [nomorSuratUkur, setNomorSuratUkur] = useState("")
    const [nib, setNib] = useState("")
    const [alamatDenah, setAlamatDenah] = useState("")
    const [peruntukan, setPeruntukan] = useState("")
    const [fotoSelfie, setFotoSelfie] = useState(null);
    const [fotoKTP, setFotoKTP] = useState(null);
    const [fotoSertifikat, setFotoSertifikat] = useState(false);
    const [fotoPbb, setFotoPbb] = useState(false);
    const [fotoStts, setFotoStts] = useState(false);
    const [fotoAktaJual, setFotoAktaJual] = useState(false);
    const [fotoWarisan, setFotoWarisan] = useState(false);
    const [fotoKuasa, setFotoKuasa] = useState(false);
    const [fotoBidang, setFotoBidang] = useState(false);
    const [daftarKoordinat, setDaftarKoordinat] = useState([])
    const [koordinatPolygon, setKoordinatPolygon] = useState(false)

    const [namaKuasa, setNamaKuasa] = useState("")
    const [check,setCheck] = useState(false)
    const [dataDiri,setDataDiri] = useState(false)
    const [result,setResult] = useState(false)

    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const movePeta = () => {
        navigation.navigate("Peta",
            {daftarKoordinatInput:daftarKoordinat,
            handleItem: (item) => setDaftarKoordinat(item)})
    }

    useEffect(() => {
      const url = configData.Developer_API +"check/datadiri"
      fetch(url,{
          method:"GET",
          credentials:"include"
      }).then(res=>res.json()).then(res=>{
        setDataDiri(res["RTN"])
      }).catch(err=>console.log(err))
    }, [])
    

    useEffect(() => {
        if(daftarKoordinat.length !== 0){
            console.log(daftarKoordinat)
            var koordinat =[]
            daftarKoordinat.map(e=>{
                var posisi = [e.koordinat.longitude,e.koordinat.latitude]
                koordinat.push(posisi)
            })
            koordinat.push([daftarKoordinat[0]["koordinat"]["longitude"],daftarKoordinat[0]["koordinat"]["latitude"]])
            const geoJsonKoordinat = {
                'type':'MultiPolygon',
                'coordinates':[[koordinat]]
            }
            setKoordinatPolygon(geoJsonKoordinat)
        }
    }, [daftarKoordinat])

    useEffect(() => {
        setCheck(checkKelengkapan())
    }, [kuasa,nomorSuratUkur,nib,namaKuasa,alamatDenah,peruntukan,fotoSelfie,fotoKTP,fotoSertifikat,fotoPbb,fotoStts,fotoAktaJual,koordinatPolygon,fotoBidang])
    
    const checkKelengkapan = () => {

        if(!dataDiri){
            return false
        }

        if(kuasa === "Sendiri"){
            if(nomorSuratUkur !== "" && nib !=="" && alamatDenah !== "" && peruntukan !== "" &&  fotoSertifikat && fotoPbb && fotoStts && fotoAktaJual && fotoBidang && koordinatPolygon){
                return true
            }else{
                return false
            }
        }else if(kuasa === "Orang Lain"){
            if(nomorSuratUkur !== "" && nib !=="" && alamatDenah !== "" && peruntukan !== "" && namaKuasa !== "" && fotoSelfie && fotoKTP && fotoSertifikat && fotoPbb && fotoStts && fotoKuasa && fotoAktaJual && fotoBidang && koordinatPolygon){
                return true
            }else{
                return false
            }
        }
    }

    const submit = () => {
        setLoading(true)
        var body = new FormData();
        body.append('hak',jenisHak)
        body.append('nomor_surat',nomorSuratUkur)
        body.append('nib',nib)
        body.append('peruntukan',peruntukan)
        body.append('alamat_denah',alamatDenah)
        body.append('geoJson',JSON.stringify(koordinatPolygon))
        body.append('kuasa',kuasa)
        fotoSertifikat.map(image=>{
            body.append('sertifikat',image);
        })
        fotoBidang.map(image=>{
            body.append('tempat',image);
        })
        fotoPbb.map(image=>{
            body.append('pbb',image);
        })
        fotoAktaJual.map(image=>{
            body.append('akta',image);
        })
        fotoStts.map(image=>{
            body.append('stts',image);
        })
    
        if(fotoWarisan){
            fotoWarisan.map(image=>{
                body.append('warisan',image);
            })
        }

        if(kuasa === "Orang Lain"){
            body.append('ktp', {uri: fotoKTP.uri,name: 'ktp.jpg',filename :'imageName.png',type: 'image/jpg'} );
            body.append('selfie', {uri: fotoSelfie.uri,name: 'selfie.jpg',filename :'imageName.png',type: 'image/jpg'} );
            fotoKuasa.map(image=>{
                body.append('kuasa',image);
            })
            body.append('nama_kuasa',namaKuasa );
        }

        const url = configData.Developer_API+"pengajuan"
        console.log(koordinatPolygon)
        fetch(url,{
            method:"POST",
            headers: {'Content-Type': 'multipart/form-data'},
            body:body,
            credentials: 'include'
        }).then(res=>res.json()).then(res=>{
            setLoading(false)
            setModalVisible(true)
            setResult(res)
        }).catch(err=>{
            setModalVisible(true)
            setLoading(false)
        })
    }
    
  return (
    <View>
      
        <ScrollView style={tw`px-4 bg-white h-11/12`}>
            {!dataDiri && 
                <View
                    style={tw`mt-3 py-3 px-2 bg-red-500 border-red-700 border-2 rounded-md w-full flex justify-center`}
                >
                    <Text style={tw`text-white font-bold rounded-md text-sm text-center`}>Data diri tidak lengkap</Text>
                    <Text style={tw`text-white font-bold rounded-md text-sm text-center`}>Mohon lengkapi terlebih dahulu</Text>
                </View>
            }
            
            <View style={tw`mt-2`}>
                <Text style={[tw`font-bold text-xl`]}>Kuasa Tanah</Text>
                <View style={tw`flex-row w-full mt-2`}>
                    <Pressable 
                        style={[tw`bg-sky-400 p-3 w-1/2 items-center justify-center`,{borderTopStartRadius:5,borderBottomStartRadius:5},kuasa != "Sendiri" && tw`bg-gray-200`]}
                        onPress={()=>setKuasa("Sendiri")}
                    >
                        <Text style={kuasa == "Sendiri" ? tw`text-white font-bold` : tw`text-black`}>Diri Sendiri</Text>
                    </Pressable>
                    <Pressable 
                        style={[tw`bg-sky-400 p-3 w-1/2 items-center justify-center`,{borderTopEndRadius:5,borderBottomEndRadius:5},kuasa != "Orang Lain" && tw`bg-gray-200`]}
                        onPress={()=>setKuasa("Orang Lain")}
                    >
                        <Text  style={kuasa == "Orang Lain" ? tw`text-white font-bold` : tw`text-black`}>Orang Lain</Text>
                    </Pressable>
                </View>
                <View  style={kuasa === "Orang Lain" ? tw`` : tw`h-0`}>
                <InputData judul="Nama pemberi kuasa" text={namaKuasa} setText={setNamaKuasa} margin={"mt-2"}/>
                    <Text style={[tw`mt-2 `]}>Foto KTP Pemberi Kuasa</Text>
                    {fotoKTP && <ViewImage image={fotoKTP}/>}
                    <InputImage setImage={setFotoKTP}/>

                    <Text style={[tw`mt-2`]}>Foto Selfie Pemberi Kuasa</Text>
                    {fotoSelfie && <ViewImage image={fotoSelfie}/>}
                    <InputImage setImage={setFotoSelfie}/>

                    <Text style={[tw`mt-2`]}>Foto Kuasa</Text>
                    {fotoKuasa && fotoKuasa.map((item,index)=>{
                        return <ViewImageMultiple image={item} key={index}/>
                    })}
                    <InputImageMutiple setImage={setFotoKuasa} navigation={navigation}/>     

                </View>
            </View>
            
            <View style={tw`pt-6 bg-white`}>
                <Text style={[tw`font-bold text-xl`]}>Status tanah</Text>
                <Text style={[tw`mt-2`]}>Sertifikat tanah</Text>
                {fotoSertifikat && <ViewImageMultiple2 data={fotoSertifikat}/>}
                <InputImageMutiple setImage={setFotoSertifikat} navigation={navigation}/>       
                <Select select={jenisHak} setSelect={setJenisHak}/>
                <InputData judul="Nomor Surat Ukur" text={nomorSuratUkur} setText={setNomorSuratUkur} margin={"mt-2"}/>
                <InputData judul="NIB" text={nib} setText={setNib} margin={"mt-2"}/>
                <InputData judul="Peruntukan" text={peruntukan} setText={setPeruntukan} margin={"mt-2"}/>
                
                <Text style={[tw`mt-2`]}>PBB</Text>
                {fotoPbb && <ViewImageMultiple2 data={fotoPbb}/>}
                <InputImageMutiple setImage={setFotoPbb} navigation={navigation}/>       
                
                <Text style={[tw`mt-2`]}>STTS</Text>
                {fotoStts && <ViewImageMultiple2 data={fotoStts}/>}
                <InputImageMutiple setImage={setFotoStts} navigation={navigation}/>       
                
                <Text style={[tw`mt-2`]}>Akta Jual Beli/Hibah</Text>
                {fotoAktaJual && <ViewImageMultiple2 data={fotoAktaJual}/>}
                <InputImageMutiple setImage={setFotoAktaJual} navigation={navigation}/>       
                
                <Text style={[tw`mt-2`]}>Surat Keterangan Warisan (Opsional)</Text>
                {fotoWarisan && <ViewImageMultiple2 data={fotoWarisan}/>}
                <InputImageMutiple setImage={setFotoWarisan} navigation={navigation}/>       
            </View>

            <View style={tw`pt-6 bg-white mb-2`}>
                <Text style={[tw`font-bold text-xl`]}>Bidang Tanah</Text>
                <InputData judul="Alamat Bidang Tanah" margin={"mt-2"} setText={setAlamatDenah} text={alamatDenah}/>
                <Text style={[tw`mt-2`]}>Foto Bidang Tanah</Text>
                {fotoBidang && <ViewImageMultiple2 data={fotoBidang}/>}
                <InputImageMutiple setImage={setFotoBidang} navigation={navigation}/>       
                
                <Text style={[tw`mt-2`]}>Gambar bidang tanah</Text>
                <Pressable onPress={movePeta}>
                    <View style={[tw`w-full mt-2  bg-gray-200 items-center p-3 rounded-md`]}>
                        <Text style={[tw`text-gray-500  font-bold` ]}>Gambar Bidang Tanah</Text>
                    </View>
                </Pressable>
            </View>
             
        </ScrollView>

        <Popup modalVisible={modalVisible} pesan={result["MSG"]} type={result["RTN"]} setModalVisible={setModalVisible} />

        <Pressable 
            style={[tw`px-4`]}
            onPress={()=>{
                if(check && !loading){  
                    submit()
                }
                }
            }
        >   
            <View style={[tw`w-full flex-row mt-2 bg-sky-500 items-center justify-center p-3 rounded-md`,!check && tw`bg-gray-300`]}>
                {loading ? <ActivityIndicator color="#ffffff"/> : <Text style={[tw`text-white font-bold` ]}>Ajukan</Text>}
                
            </View>
        </Pressable>
    </View>
  )
}

export default Pengajuan