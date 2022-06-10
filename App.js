import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/Screen/SplashScreen';
import Home from './src/Screen/Home';
import Login from './src/Screen/Login';
import Register from './src/Screen/Register';
import LupaPassword from './src/Screen/LupaPassword';
import Peta from './src/Screen/Peta';
import DataDiri from './src/Screen/DataDiri';
import Pengajuan from './src/Screen/Pengajuan';
import StatusPengajuan from './src/Screen/StatusPengajuan';
import imageMutiple from './src/Utils/imageMutiple';
import DetailPengajuan from './src/Screen/DetailPengajuan';
import Signature from './src/Screen/Signature';
import CameraInput from './src/Utils/CameraInput';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="SplashScreen">
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Peta" component={Peta}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerTitle:"",headerTransparent:true}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Data diri" component={DataDiri}  />
        <Stack.Screen name="Pengajuan" component={Pengajuan} />
        <Stack.Screen name="Status Pengajuan" component={StatusPengajuan} />
        <Stack.Screen name="Detail Pengajuan" component={DetailPengajuan} />
        <Stack.Screen name="Signature" component={Signature} />
        <Stack.Screen name="Camera" component={CameraInput} />
        <Stack.Screen name="Lupa Password" component={LupaPassword} />
        <Stack.Screen
          name='ImageBrowser'
          component={imageMutiple}
          options={{
            title: 'Selected 0 files',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

