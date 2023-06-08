import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Balance = ({userName, amount}) => {
  return (
    <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',borderColor:"#9ca3af",borderRadius:5,borderStyle:'solid',borderWidth:2,padding:15, marginTop:4}}>
        <View style={{flex:0,flexDirection:'row',marginLeft:7}}> 
        <FontAwesome5 name='user' size={20} color="#cbc4c5"/>

            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:"bold" ,color:"white", fontSize:16,fontFamily:"Roboto-Medium",}}>{userName}</Text> 
            </View>
        </View>

        <Text   style={{color:"white", fontSize:16,fontFamily:"Roboto-Medium", marginRight:10}}>
          <FontAwesome5 name='rupee-sign' size={16} color="white"/> {amount%1===0?amount.toFixed(0):amount.toFixed(1)}
        </Text> 
    </View>
  )
}

export default Balance