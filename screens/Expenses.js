import { View, Text, TouchableOpacity,ScrollView, TextInput } from 'react-native'
import React,{useState} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Expense from '../partials/Expense'
import { SafeAreaView } from 'react-native-safe-area-context'

const Expenses = ({navigation}) => {  

    return (
      <SafeAreaView style={{flex:1, backgroundColor:"#0d0f14"}}>
      <View style={{backgroundColor:"#0d0f14"}}>

              {/*Navigation*/}
              <View style={{backgroundColor:"#0d0f14",marginTop:5, shadowColor: '#9ca3af', paddingBottom:15,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity:  1,
                shadowRadius: 3,
                elevation: 4,}}>
                <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:"space-between"}}>
                <Text style={{color:"white",marginTop:12, fontSize:20, marginLeft:5,fontFamily:"Roboto-Medium",fontWeight:"bold"}}>All Expenses</Text>
              <TouchableOpacity
                    onPress={()=>{navigation.goBack()}}>
                          <Entypo
                              style={{marginTop:10}}
                              name='back'
                              size={26}
                              color="#9ca3af"  />
              </TouchableOpacity>     
                </View>
     
          </View>
          {/*Navigation*/} 
          </View>

          <View style={{paddingHorizontal:20}}>
          <View className=' border-solid border-2 w-full border-b-gray-400 p-2 mt-5'  style={{flexDirection:"row"}}>
                            <FontAwesome
                                name='search'
                                size={20}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput   placeholderTextColor={"#9ca3af"} placeholder='what was this expense for?'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

          {/*Personal Expenses start */}
        <View style={{flex:0,flexDirection:'column',marginTop:30,maxHeight:320}}>
          <ScrollView>
            {/* <Expense iname="fast-food-outline" name="Expense" date="20-05-2023" amount={199}/>
            <Expense iname="medical-outline" name="Blood Test" date="10-05-2023" amount={499}/> */}
          </ScrollView>
        </View>
         {/*Personal Expenses END */}

          </View>

      </SafeAreaView>
  );
}

export default Expenses