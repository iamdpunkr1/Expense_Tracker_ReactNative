import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const Groups = ({name, iname,}) => {
  return (
    <View style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center',borderRadius:6,height:64,width:64,marginTop:8,marginRight:8}}  >
      <FontAwesome5 name={iname} size={20} color="#0d0f14" /> 
      <Text  style={{fontWeight:'bold', color:"white", fontSize:12,fontFamily:"Roboto-Medium",marginTop:5}}>{name}</Text>               
   </View>
  )
}

export default Groups