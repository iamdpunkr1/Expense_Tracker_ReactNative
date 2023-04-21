import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React, {useState} from 'react'
import Tabs from '../partials/Tabs'
import { FloatingAction } from "react-native-floating-action";

const GroupInfo = ({navigation}) => {

  const [active , setactive] = useState(false);
  const [expactive , setexpactive] = useState(false);

  const groupExpenses=[
    {
      iname:"fast-food-outline",
      name:"Fast Food",
      date:"21-05-2023",
      amount:299
    },
    {
      iname:"fast-food-outline",
      name:"Fast Food",
      date:"21-05-2023",
      amount:299
    },
    {
      iname:"fast-food-outline",
      name:"Fast Food",
      date:"21-05-2023",
      amount:299
    },
    {
      iname:"fast-food-outline",
      name:"Fast Food",
      date:"21-05-2023",
      amount:299
    },

  ]

 const balances =[
  {
    userName:"Dipankar Prasad",
    amount:487
  },
  {
    userName:"Akash Chetia",
    amount:890
  }
 ]

 const actions = [
  {
    text: "Add Expense",
    icon: <FontAwesome5 name="file-invoice"  size={18} color="white"/>,
    name: "add_expense",
    position: 1,
    color:"#d7261b"
  },
  {
    text: "Add member",
    icon: <Ionicons name="person-add-sharp"  size={18} color="white"/>,
    name: "add_member",
    position: 2,
    color:"#d7261b"
  },
 
];
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
         <View style={{flex:0,flexDirection:'column',marginTop:3,maxHeight:'71%'}}>
            <Tabs  groupExpenses={groupExpenses}  balance={balances}/>
         </View>

     </View>
    {/*Padding Horizontal END
    ()=>{setactive(!active)}*/}

 
    <FloatingAction
              actions={actions}
              color="#d7261b"
              onPressItem={name => {
               name==="add_member"?  setactive(!active) :  setexpactive(!expactive)
              }}
            />

<Modal
          animationType="slide"
          transparent={true}
          visible={active}
          onRequestClose={() => {
            console.warn("closed");
          }}
          >
          <View style={{    flex: 1,
                            backgroundColor : "black",
                            alignItems: 'center',
                            justifyContent: 'center',}}>
            <View  style={ {
                        backgroundColor : "black" ,
                        height :'35%' ,
                        minWidth:'90%',
                        borderRadius : 15,
                        alignItems : "center",
                        justifyContent : "center",
                        borderColor : "white",
                        borderWidth:2,
                      }}>
                    <Text style={ {
                          fontSize : 17,
                          color : "white",
                          marginBottom:20,
                          paddingTop:30
                        }}>Add member</Text>
                       <View className=' border-solid border-2 w-full border-b-gray-400'  style={{flexDirection:"row"}}>
                          <Ionicons
                              name='person-add-sharp'
                              size={23}
                              color="#9ca3af"
                              style={{marginRight: 5}}
                            />
                            <TextInput   placeholderTextColor={"#9ca3af"} placeholder='Enter the group name'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                  <TouchableOpacity
                         style={{
                          backgroundColor: '#d7261b',
                          padding: 15,
                          borderRadius: 10,
                          marginBottom: 30,
                          minWidth:'60%',
                          marginTop:20
                        }}
                          onPress={()=>{setactive(!active)}}>
                            <Text style={ {
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#fff',
                        }}>Add Group</Text>
                  </TouchableOpacity>
            </View>
          </View>
        </Modal>

        
     <Modal
          animationType="slide"
          transparent={true}
          visible={expactive}
          onRequestClose={() => {
            console.warn("closed");
          }}
          >
          <View style={{    flex: 1,
                            backgroundColor : "black",
                            alignItems: 'center',
                            justifyContent: 'center',}}>
            <View  style={ {
                        backgroundColor : "black" ,
                        height :'50%' ,
                        minWidth:'90%',
                        borderRadius : 15,
                        alignItems : "center",
                        justifyContent : "center",
                        borderColor : "white",
                        borderWidth:2,
                      }}>
               <Text style={ {
                          fontSize : 17,
                          color : "white",
                          marginBottom:20,
                          paddingTop:30
                        }}>Add a Expense</Text>
                         <View className=' border-solid border-2 w-full border-b-gray-400'  style={{flexDirection:"row"}}>
                            <FontAwesome5
                                name='rupee-sign'
                                size={30}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput   placeholderTextColor={"#9ca3af"} placeholder='Enter the amount'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View className=' border-solid border-2 w-full border-b-gray-400 mt-3'  style={{flexDirection:"row"}}>
                            <FontAwesome5
                                name='file-invoice'
                                size={30}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput   placeholderTextColor={"#9ca3af"} placeholder='what was this expense for?'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View className=' border-solid border-2 w-full border-b-gray-400 mt-3'  style={{flexDirection:"row"}}>
                            <MaterialIcons
                                name='date-range'
                                size={30}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput   placeholderTextColor={"#9ca3af"} placeholder='--/--/----'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>
                          <ScrollView horizontal={true} className='h-16'>
                        
        <View  style={{flex:0,flexDirection:'row' ,justifyContent:'space-evenly',alignContent:'space-between', marginTop:6,}}>
          <View style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center'}}   className='rounded-md h-16 w-16 mt-2 mr-2'>
           <FontAwesome5 name='shopping-cart' size={20} color="#0d0f14" /> 
            <Text  className='font-bold'  style={{color:"white", fontSize:12,fontFamily:"Roboto-Medium",marginTop:5}}>Shopping</Text>              
          </View>
          <View style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center'}}   className='rounded-md h-16 w-16 mt-2 mr-2'>
           <FontAwesome5 name='restroom' size={20} color="#0d0f14" /> 
            <Text  className='font-bold'  style={{color:"white", fontSize:12,fontFamily:"Roboto-Medium",marginTop:5}}>Rent</Text>             
          </View>
          <View style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center'}}   className='rounded-md h-16 w-16 mt-2 mr-2'>
           <FontAwesome5 name='shopping-basket' size={20} color="#0d0f14" /> 
            <Text  className='font-bold'  style={{color:"white", fontSize:12,fontFamily:"Roboto-Medium",marginTop:5}}>Ration</Text>              
          </View>
          <View style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center'}}   className='rounded-md h-16 w-16 mt-2 mr-2'>
           <MaterialIcons name='sports-basketball' size={20} color="#0d0f14" /> 
            <Text  className='font-bold'  style={{color:"white", fontSize:12,fontFamily:"Roboto-Medium",marginTop:5}}>Sports</Text>                 
          </View>
        </View>
        </ScrollView>
                  <TouchableOpacity
                         style={{
                          backgroundColor: '#d7261b',
                          padding: 15,
                          borderRadius: 10,
                          marginBottom: 30,
                          minWidth:'60%',
                          marginTop:5
                        }}
                          onPress={()=>{setexpactive(!expactive)}}>
                            <Text style={ {
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#fff',
                        }}>Add Expense</Text>
                  </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  )
}

export default GroupInfo