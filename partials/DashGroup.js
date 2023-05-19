import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
const DashGroup = ({iname, name,  amount, nav}) => {
  return (
    <TouchableOpacity onPress={()=>{nav.navigate("GroupInfo")}}>
    <LinearGradient colors={['#52545b','#595b62']} style={{justifyContent:'center',alignItems:'center',borderRadius:6,height:112,width:112,marginTop:8,marginRight:8,borderColor:"#2e2f33",borderWidth:4}}>
      
          <FontAwesome5 name={iname} size={30} color="#0d0f14" /> 
          <Text  style={{fontWeight:'bold',color:"white", fontSize:16,fontFamily:"Roboto-Medium",marginTop:5}}>{name}</Text> 
          <Text   style={{color:"white", fontSize:14,fontFamily:"Roboto-Medium",}}>
          <FontAwesome5 name='rupee-sign' size={14} color="#fff"/> {amount}
          </Text>                
     
    </LinearGradient>
  </TouchableOpacity>
  )
}

export default DashGroup