import React from 'react'
import {SafeAreaView, Text, View ,Image, TextInput, Button, TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Register = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center", backgroundColor:"#0d0f14"}} >
      
      <View style={{paddingHorizontal:25}}>
        <View style={{alignItems:"center"}}>
        <Image source={require('../assets/register.png')}  style={{width: 400, height: 300}}/>
        </View>
        <Text  className='font-bold' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:28, }}>Register</Text>


        <View className='mt-5 border-solid border-2 border-b-gray-400'  style={{flexDirection:"row"}}>
            <MaterialIcons
                name='person-outline'
                size={20}
                color="#9ca3af"
                style={{marginRight: 5}}
            />
            <TextInput   placeholder='Full Name' placeholderTextColor={"#9ca3af"} style={{paddingVertical:0, color:"white"}}/>
        </View>

        <View  className="border-solid border-2 border-b-gray-400 mb-4 mt-5" style={{flexDirection:"row"}}>
        <MaterialIcons
            name='alternate-email'
            size={20}
            color="#9ca3af"
            style={{marginRight: 5}}
          />
          <TextInput   placeholderTextColor={"#9ca3af"} placeholder='Email ID' keyboardType='email-address'  style={{paddingVertical:0, color:"white"}}/>
       
        </View>

        <View  className="border-solid border-2 border-b-gray-400 mb-5" style={{flexDirection:"row"}}>
        <MaterialIcons
            name='lock-outline'
            size={20}
            color="#9ca3af"
            style={{marginRight: 5}}
          />
        <TextInput   placeholder='Password' placeholderTextColor={"#9ca3af"} secureTextEntry={true} style={{paddingVertical:0, color:"white"}}/>
        </View>
        <TouchableOpacity
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
      Register
      </Text>
    </TouchableOpacity>

        <View className='flex mt-5' style={{flexDirection:"row", alignItems:"center",justifyContent:"center"}}> 
        <Text style={{color:"white",fontFamily:"Roboto-Medium", marginRight:10}}>
           Already have a account?
        </Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
          <Text className='font-bold' style={{color:"#e44816",fontSize:16 }}>
           Login
          </Text>
        </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default Register