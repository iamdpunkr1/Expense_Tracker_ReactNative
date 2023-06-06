import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Expense = ({expenseData, deleteSelfExpense, gid, isGroup, showEdit}) => {
  //list people-outline receipt-outline  cart-outline
  const {title, amount, category, date}=expenseData 
  let iname=''
  switch(category){
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
    <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',borderColor:"#9ca3af",borderRadius:5,borderStyle:'solid',borderWidth:2,padding:4, marginTop:4,paddingVertical:8}}>
        <View style={{flex:0,flexDirection:'row',marginLeft:7}}>
            <Ionicons name={iname} size={35} color="#9ca3af"/>
            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:"bold" ,color:"white", fontSize:16,fontFamily:"Roboto-Medium",marginTop:2}}>{title}</Text> 
                <Text   style={{color:"#a1a1aa", fontSize:13,fontFamily:"Roboto-Medium",}}>
                <MaterialIcons name='date-range' size={14} color="#a1a1aa"/>{date}
                </Text> 
            </View>
        </View>
        <View >

          <View style={{flexDirection:"row",}}>
            {isGroup && <TouchableOpacity style={{}} onPress={()=>{showEdit(gid)}}>
             <AntDesign style={{marginHorizontal:10}} name='edit' size={20} color="#cbc4c5"/>
            </TouchableOpacity>}
              <TouchableOpacity onPress={()=> deleteSelfExpense(gid)}>
              <AntDesign  style={{marginHorizontal:isGroup && 10, paddingLeft: isGroup==true?0:24}}   name='delete' size={20} color="#b5807f"/>
              </TouchableOpacity>
          </View>
          <View>
          <Text   style={{color:"white", fontSize:16,fontFamily:"Roboto-Medium",marginTop:5, marginRight:10, paddingLeft: isGroup==true?24:0}}>
              <FontAwesome5 name='rupee-sign' size={16} color="white"/> {amount}
            </Text> 
          </View>
        </View>

    </View>
  )
}

export default Expense