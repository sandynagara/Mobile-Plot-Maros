import { View, ScrollView,LogBox} from 'react-native'
import React,{useState,useEffect} from 'react'
import configData from "../config/config.json"
import InformasiPengajuan from '../Pengajuan/Detail/InformasiPengajuan'
import InformasiStatus from '../Pengajuan/Detail/InformasiStatus'
import InformasiGeometryTanah from '../Pengajuan/Detail/InformasiGeometryTanah'
import InformasiPemohonLain from '../Pengajuan/Detail/InformasiPemohonLain'

const DetailPengajuan = ({navigation,route}) => {

    const [data, setData] = useState(false)

    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);

    useEffect(() => {
      console.log(route)
      const id = route["params"]["data"]
      const url = configData.Developer_API+"pengajuan/"+id
      fetch(url,{
          method:"GET",
          credentials:"include"
      }).then(res=>res.json()).then(res=>{
        console.log(res)
        setData(res)
      }).catch(err=>console.log(err))
    }, [])

    
  return (
    <View>
        <ScrollView>
            <InformasiPengajuan data={data} />
            {data && data["ktp_kuasa"] &&  <InformasiPemohonLain data={data} />}
            <InformasiStatus data={data} navigation={navigation}/>
            {data && <InformasiGeometryTanah data={data}/>}
        </ScrollView>
    </View>
  )
}

export default DetailPengajuan