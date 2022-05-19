import { View, Text ,TextInput,ActivityIndicator,KeyboardAvoidingView,Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import tw from 'twrnc';
import configData from "../config/config.json"
import Footer from '../Footer/Footer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [status, setStatus] = useState(true)
    const [response, setResponse] = useState(false)
    const [loading, setLoading] = useState(false)

    const buatAkun = () => {
        navigation.navigate('Register')
    }

    const cek = () => {
        if(username === "" || pass === ""){
            setStatus(true)
            return
        }
        
        setStatus(false)
    }

    useEffect(() => {
        cek()
    }, [username,pass])

    const login = () => {
        setLoading(true)
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
        then(async(res)=>{
            if(res["RTN"]){
                setLoading(false)
                await AsyncStorage.setItem('logged', "login")
                console.log("berhasil")
                navigation.navigate('Home')
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
     <View style={[tw`h-full w-full justify-center items-center px-10`]}>
        <Text style={tw`text-3xl font-bold text-left w-full`}>
            Login
        </Text>
        <TextInput
            style={[tw` border-2 py-2 px-3 mt-4 w-full rounded-sm border-gray-300`]}
            placeholder={"Username"}
            onChangeText={(username)=>{setUsername(username)}}
        />
        <TextInput
            style={[tw` border-2 mt-3 py-2 px-3 w-full rounded-sm border-gray-300`]}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(pass)=>{setPass(pass)}}
        />
        <Pressable style={[tw`bg-sky-500 py-3 w-full rounded-sm mt-3`,status && tw`bg-gray-300`]} 
            onPress={()=>{
                if(!status){
                    login()
                }
            }}
        >   
            <View>
                {loading ? <ActivityIndicator color="#ffffff"/> : <Text style={tw`text-white text-center font-bold`}>LOGIN</Text>}
            </View>
           
        </Pressable>
        {response && 
                <View
                style={tw`mt-3 py-3 px-2 bg-red-400 rounded-md w-full flex justify-center`}
                >
                    
                    <Text style={tw`text-white rounded-md text-sm text-center`}>{response["MSG"]}</Text>
                </View>
            }
        <Pressable style={[tw` py-3 w-full rounded-sm mt-3`]} onPress={buatAkun}>
            <Text style={tw`text-sky-500 text-center font-bold`}>BUAT AKUN</Text>
        </Pressable>
        
        <Footer/>
    </View>
  </KeyboardAvoidingView>
   
  )
}

export default Login