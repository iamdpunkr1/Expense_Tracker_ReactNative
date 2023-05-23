import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const DashGroup = ({groupData, nav}) => {
  
  const {groupTitle, groupCategory,amount}=groupData 

  let iname=''
  switch(groupCategory){
    case 'General': iname="receipt-outline"
                    break;
    case 'Education': iname="book-outline"
                    break;

    case 'Food':    iname="fast-food-outline"
                    break;

    case 'Rent':    iname="home-outline"
                    break;    

    case 'Medical': iname="medical-outline"
                    break;

    case 'Social Event': iname="people-outline"
                        break;

    case 'Shopping':  iname="cart-outline"
                      break;

    case 'Miscelleneous': iname="list"
                      break;
    default: iname='list'
              break;         
        }
  return (
    <TouchableOpacity onPress={()=>{nav.navigate("GroupInfo")}}>
    <LinearGradient colors={['#52545b','#595b62']} style={{justifyContent:'center',alignItems:'center',borderRadius:6,height:112,width:112,marginTop:8,marginRight:8,borderColor:"#2e2f33",borderWidth:4}}>
      
          <Ionicons name={iname} size={30} color="#0d0f14" /> 
          <Text  style={{fontWeight:'bold',color:"white", fontSize:16,fontFamily:"Roboto-Medium",marginTop:5}}>{groupTitle}</Text> 
          <Text   style={{color:"white", fontSize:14,fontFamily:"Roboto-Medium",}}>
          <FontAwesome5 name='rupee-sign' size={14} color="#fff"/> {amount}
          </Text>                
     
    </LinearGradient>
  </TouchableOpacity>
  )
}

export default DashGroup