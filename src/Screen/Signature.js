import SignatureScreen from "react-native-signature-canvas";
import React,{useRef} from 'react'
import * as FileSystem from "expo-file-system";

const Signature = ({navigation,route}) => {
  const ref = useRef();

  function guidGenerator(){
    var S4 = function(){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    const path = FileSystem.cacheDirectory + "sign_"+guidGenerator()+".png";
    FileSystem.writeAsStringAsync(
    path,
    signature.replace("data:image/png;base64,", ""),
    { encoding: FileSystem.EncodingType.Base64 }
    )
    .then(() => FileSystem.getInfoAsync(path))
    .then((file)=>{
        if(file["exists"]){
            route.params.handleItem(file.uri)
            navigation.goBack()
        }
    })
    .catch(console.error);
 // Callback from Component props
  };

  return (
    <SignatureScreen
      ref={ref}
      onOK={handleOK}
      descriptionText={"Tanda Tangan"}
    />
  );
};

export default Signature;