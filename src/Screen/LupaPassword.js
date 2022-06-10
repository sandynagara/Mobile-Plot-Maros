import { View, Text ,TextInput,ActivityIndicator,KeyboardAvoidingView,Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import tw from 'twrnc';
import configData from "../config/config.json"
import Footer from '../Footer/Footer';

const Login = ({navigation,route}) => {

    const [jawaban, setJawaban] = useState("")
    const [status, setStatus] = useState("")
    const [response, setResponse] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pass, setPass] = useState(false)

    const data = route["params"]["data"]

    const cek = () => {
        if(pass === ""){
            setStatus(true)
            return
        }
        
        setStatus(false)
    }

    useEffect(() => {
        cek()
    }, [pass])

    const gantiPassword = () => {
        const url = configData.Developer_API+"gantipassword"
        fetch(url,{
            method:"PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jawaban: jawaban,
                username: data["username"],
                password: pass,
            }),
        }).then(res=>res.json()).
        then((res)=>{
            
            if(res["RTN"]){
                setLoading(false)
                setResponse(res)
                navigation.navigate('Login')
            }else{
                setLoading(false)
                setResponse(res)
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
        <Text style={tw`text-xl font-bold text-left w-full`}>
            Lupa Password
        </Text>
        <TextInput
            style={[tw` border-2 py-2 px-3 mt-4 w-full rounded-sm border-gray-300`]}
            value={data["pertanyaan"]}
        />
        <TextInput
            style={[tw` border-2 py-2 px-3 mt-4 w-full rounded-sm border-gray-300`]}
            placeholder={"Jawaban"}
            onChangeText={(username)=>{setJawaban(username)}}
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
                    gantiPassword()
                }
            }}
        >   
            <View>
                {loading ? <ActivityIndicator color="#ffffff"/> : <Text style={tw`text-white text-center font-bold`}>Ganti Password</Text>}
            </View>
           
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

export default Login