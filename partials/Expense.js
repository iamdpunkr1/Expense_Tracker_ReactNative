import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Expense = ({iname, name, date, amount}) => {
  return (
    <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',borderColor:"#9ca3af",borderRadius:5,borderStyle:'solid',borderWidth:2,padding:4, marginTop:4}}>
        <View style={{flex:0,flexDirection:'row',marginLeft:7}}>
            <Ionicons name={iname} size={35} color="#9ca3af"/>
            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:"bold" ,color:"white", fontSize:16,fontFamily:"Roboto-Medium",marginTop:2}}>{name}</Text> 
                <Text   style={{color:"#a1a1aa", fontSize:13,fontFamily:"Roboto-Medium",}}>
                <MaterialIcons name='date-range' size={14} color="#a1a1aa"/>{date}
                </Text> 
            </View>
        </View>
        <View>
        <MaterialIcons style={{paddingLeft:25}} name='delete-forever' size={20} color="#b5807f"/>
        <Text   style={{color:"white", fontSize:16,fontFamily:"Roboto-Medium",marginTop:5, marginRight:10}}>
          <FontAwesome5 name='rupee-sign' size={16} color="white"/> {amount}
        </Text> 
        </View>

    </View>
  )
}

export default Expense