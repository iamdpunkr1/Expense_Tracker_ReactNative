import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import Tabs from '../partials/Tabs'

const GroupInfo = ({navigation}) => {
  return (

    <SafeAreaView style={{flex:1, backgroundColor:"#0d0f14"}}>
   {/*Padding Horizontal start*/}
     <View  style={{paddingHorizontal:15}}>
      {/*Back button */}
        <View style={{marginTop:5, flexDirection:'row'}}>
             <TouchableOpacity
                  onPress={()=>{navigation.navigate("Home")}}>
                         <Ionicons name="arrow-back" size={40} color="#9ca3af"/>
            </TouchableOpacity>          
        </View>
        {/*Back button End */} 
        {/*Group Info! start */}
        <View  style={{backgroundColor:"#e44816"}}   className='rounded-md h-28 w-full mb-2 p-5 mt-2 text-center'>
             <Text    className='font-bold mt-1 ' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:30}}>
                 Group: Ration
             </Text>
             <Text  style={{color:"white", fontSize:16, marginLeft:5,fontFamily:"Roboto-Medium",}}>Created by: You</Text>
        </View>
        {/*Group Info! end */}
         <View style={{flex:0,flexDirection:'row'}}>
         <View style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center',flexDirection:'row'}}   className='rounded-md pb-1 px-3 mr-1'>
            <Text  className='font-bold'  style={{color:"white", fontSize:15,fontFamily:"Roboto-Medium",marginTop:5}}>Dipankar Prasad</Text> 
        </View>

          <View style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center',flexDirection:'row'}}   className='rounded-md pb-1 px-3'>
            <Text  className='font-bold'  style={{color:"white", fontSize:15,fontFamily:"Roboto-Medium",marginTop:5}}>Akash Chetia</Text> 
            <Ionicons style={{marginTop:4, marginLeft:4}} name='close' size={20} color="#fff" />              
          </View>
         </View>
        
         <Tabs  />
     </View>
    {/*Padding Horizontal END*/}

 
    </SafeAreaView>
  )
}

export default GroupInfo