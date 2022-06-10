import { View, Text ,TextInput,ActivityIndicator,KeyboardAvoidingView,Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import tw from 'twrnc';
import Footer from '../Footer/Footer';
import configData from "../config/config.json"
import {Picker} from '@react-native-picker/picker';

const Register = ({navigation}) => {

    const [namaLengkap, setNamaLengkap] = useState("")
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const [status, setStatus] = useState(true)
    const [response, setResponse] = useState(false)
    const [pertanyaan, setPertanyaan] = useState("Siapa nama teman masa kecil anda?")
    const [jawaban, setJawaban] = useState("")

    const [loading, setLoading] = useState(false)

    const cek = () => {
        if(namaLengkap === "" || jawaban === "" || username === "" || pass === "" || confirm === ""){
            setStatus(true)
            return
        }

        if(confirm !== pass){
            setStatus(true)
            return
        }
        
        setStatus(false)
    }

    useEffect(() => {
        cek()
    }, [namaLengkap,username,pass,confirm,jawaban])

    const submit = () => {
        setLoading(true)
        const url = configData.Developer_API + "register"
        fetch(url,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama:namaLengkap ,
                username: username,
                password: pass,
                kelas:"user",
                pertanyaan:pertanyaan,
                jawaban:jawaban
              }),
            credentials: 'include'
        }).then(res=>res.json()).
        then(res=>{
            setLoading(false)
            console.log(res)
            if(res["RTN"]){
                const url = configData.Developer_API + "login"
                fetch(url,{
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: pass,
                      }),
                    credentials: 'include'
                }).then(res=>res.json()).
                then(res=>{
              
                    if(res["RTN"]){
                        console.log("berhasil")
                        navigation.navigate('Home')
                    }else{
                        navigation.navigate('Login')
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                setLoading(false)
                setResponse(res)
                console.log("gagal")
            }
        }).catch(err=>{
            setLoading(false)
            console.log(err)
        })
       
    }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={false}
    >
        <View style={[tw`h-full w-full justify-center items-center px-10 `]}>
            <Text style={tw`text-3xl font-bold text-left w-full`}>
                Register
            </Text>
            <TextInput
                
                style={[tw` border-2 py-2 px-3 mt-4 w-full rounded-sm border-gray-300`,namaLengkap == "" && tw`border-red-200`]}
                placeholder={"Nama Lengkap"}
                onChangeText={(nama)=>{setNamaLengkap(nama)}}
            />
            <TextInput
                style={[tw` border-2 py-2 px-3 mt-3 w-full rounded-sm border-gray-300`,namaLengkap == "" && tw`border-red-200`]}
                placeholder={"Username"}
                onChangeText={(username)=>{setUsername(username)}}
            />
            <TextInput
                style={[tw` border-2 mt-3 py-2 px-3 w-full rounded-sm border-gray-300`,pass == "" && tw`border-red-200`]}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(pass)=>{setPass(pass)}}
            />
            <TextInput
                style={[tw` border-2 mt-3 py-2 px-3 w-full rounded-sm border-gray-300`,confirm == "" && tw`border-red-200`]}
                placeholder={"Confirm Password"}
                secureTextEntry={true}
                onChangeText={(pass)=>{setConfirm(pass)}}
            />
            <View style={tw` mt-2 w-full border-2 border-gray-300`}>
                <Picker
                    selectedValue={pertanyaan}
                    onValueChange={(itemValue, itemIndex) =>
                        setPertanyaan(itemValue)
                    }
                    style={[tw`text-black  w-full rounded-sm`]}
                >
                    <Picker.Item label="Dimana kota tempat anda lahir?" value="Siapa nama teman masa kecil anda?"  />
                    <Picker.Item label="Dimana anda bersekolah dasar?" value="Apa merek kendaraan pertama anda?" />
                    <Picker.Item label="Siapa nama hewan peliharaan anda?" value="Siapa nama hewan peliharaan anda?" />
                    <Picker.Item label="Apa merek kendaraan pertama anda?" value="Dimana anda bersekolah dasar?" />
                    <Picker.Item label="Siapa nama teman masa kecil anda?" value="Siapa nama teman masa kecil anda?" />
                </Picker>   
            </View>
       
            <TextInput
                style={[tw` border-2 mt-3 py-2 px-3 w-full rounded-sm border-gray-300`,confirm == "" && tw`border-red-200`]}
                placeholder={"Jawaban"}
                onChangeText={(pass)=>{setJawaban(pass)}}
            />
            <Pressable style={[tw`bg-sky-500 py-3 w-full rounded-sm mt-3`,status && tw`bg-gray-300`]}
                    onPress={()=>{
                        if(!status && !loading){
                            submit()
                        }
                    }}
            >   
                {loading ? <ActivityIndicator color="#ffffff"/> : <Text style={tw`text-white text-center font-bold`}>BUAT AKUN</Text>}
            </Pressable>
            {response && 
                <View
                style={tw`mt-3 py-3 px-2 bg-red-400 rounded-md w-full flex justify-center`}
                >
                    
                    <Text style={tw`text-white rounded-md text-sm text-center`}>{response["MSG"]}</Text>
                </View>
            }
            <Footer/>
        </View>
    </KeyboardAvoidingView>

  )
}

export default Register