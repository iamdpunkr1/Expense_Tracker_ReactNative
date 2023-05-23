import React,{useState} from 'react'
import {SafeAreaView, Text, View ,Image, TextInput, Button, TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext'
const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  
  const handleSubmit = async()=>{
    // e.preventDefault()

    await login(email,password,navigation)

  }
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center", backgroundColor:"#0d0f14"}} >
      
      <View style={{paddingHorizontal:25}}>
        <View style={{alignItems:"center"}}>
        <Image source={require('../assets/login.png')}  style={{width: 350, height: 250}}/>
        </View>
        <Text  className='font-bold' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:28}}>Login</Text>


        <View className='mt-5 border-solid border-2 border-b-gray-400'  style={{flexDirection:"row"}}>
        <MaterialIcons
            name='alternate-email'
            size={20}
            color="#9ca3af"
            style={{marginRight: 5}}
          />
          <TextInput  value={email} onChangeText={(text)=>{setEmail(text)}}     placeholderTextColor={"#9ca3af"} placeholder='Email ID' keyboardType='email-address'  style={{paddingVertical:0, color:"white"}}/>
        </View>

        <View  className="border-solid border-2 border-b-gray-400 mb-5 mt-5" style={{flexDirection:"row"}}>
        <MaterialIcons
            name='lock-outline'
            size={20}
            color="#9ca3af"
            style={{marginRight: 5}}
          />
        <TextInput   value={password} onChangeText={(text)=>{setPassword(text)}}    placeholder='Password' placeholderTextColor={"#9ca3af"} secureTextEntry={true} style={{paddingVertical:0, color:"white"}}/>
        </View>
        <TouchableOpacity
        onPress={handleSubmit}
       style={{
        backgroundColor: '#d7261b',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        marginTop:10
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
      Login
      </Text>
    </TouchableOpacity>
    {error && 
        // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
           <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
        // </View>
    }
        <View className='flex mt-5' style={{flexDirection:"row", alignItems:"center",justifyContent:"center"}}> 
        <Text style={{color:"white",fontSize:16, marginRight:10}}>
            Don't have a account?
        </Text>
        <TouchableOpacity onPress={()=>{navigation.push('Register')}}>
          <Text className='font-bold' style={{color:"#e44816",fontSize:16 }}>
            Register
          </Text>
        </TouchableOpacity>

        </View>
        </View>
    </SafeAreaView>
  )
}

export default Login