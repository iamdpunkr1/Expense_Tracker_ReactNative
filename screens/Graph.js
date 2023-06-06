import { View, Text, TouchableOpacity, Modal,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { SafeAreaView } from 'react-native-safe-area-context'
import Donut from '../partials/Donut'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuthContext } from '../hooks/useAuthContext'
import { useExpenseContext } from '../context/ExpenseContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Graph = ({navigation}) => {
  const {user, dispatch}=useAuthContext()
  const { selfExpenses, groups } = useExpenseContext()
  

 
  const [balance,setBalance] = useState(user && user.user.balance)
  const [spent,setSpent] = useState(0)
  const [active , setactive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error , setError] = useState(null);
  
  const changeBalance =async()=>{
   
    if(!user){
      setError("You must ge logged in")
      return
    }
    const newBalance=balance
    const response = await fetch('http://10.0.2.2:4000/balance/'+user.user._id,{
        method:'PATCH',
        body:JSON.stringify({newBalance}),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
  
      const json = await response.json()
      if(!response.ok){
        console.log("error: ",json)
        setError(json.error)
      }
      if(response.ok){
        setError(null)
        setactive(false)
        console.log(json)
        // save the user to local storage
        AsyncStorage.setItem('user',JSON.stringify(json))
        // update the auth context
         dispatch({type:'LOGIN', payload:json})
      }
        
  }

  useEffect(()=>{
    console.log("useEffect BALANCE")
    if(user){
       //total expense amount
        let total=0
        selfExpenses.forEach(exp=> total+=parseInt(exp.amount))
        let groupTotal=0
        groups.forEach(grp=>grp.members.forEach(mem=> {if(mem.memberEmail===user.user.email){groupTotal+=parseInt(mem.groupBalance)}}))
        total+=groupTotal
        setSpent(total)
      
    }
  },[user,groups,selfExpenses])

  return (
  
    <SafeAreaView style={{flex:1, backgroundColor:"#0d0f14"}}>
    <View style={{backgroundColor:"#0d0f14"}}>

            {/*Navigation*/}
            <View style={{backgroundColor:"#0d0f14",marginTop:5, shadowColor: '#9ca3af', paddingBottom:10,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity:  0.3,
              shadowRadius: 3,
              elevation: 2,}}>
              <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:"space-between"}}>
              <Text style={{color:"white",marginTop:12, fontSize:20, marginLeft:5,fontFamily:"Roboto-Medium",fontWeight:700}}>Balance</Text>
            <TouchableOpacity
                  onPress={()=>{navigation.openDrawer()}}>
                        <MaterialIcons
                            style={{marginTop:8}}
                            name='menu'
                            size={35}
                            color="#9ca3af"  />
            </TouchableOpacity>     
              </View>
   
        </View>
        {/*Navigation*/} 
        </View>

        <View style={{paddingHorizontal:20}}>
          <View  style={{backgroundColor:"#e44816",borderTopLeftRadius:7,borderTopRightRadius:7,flexDirection:"row",justifyContent:"space-around"}}   className=' h-26 w-full p-5 mt-2'>
            <View>
                <Text  style={{color:"white", fontSize:16,fontFamily:"Roboto-Medium",}}>Monthly Balance</Text>
                <Text    className='font-bold mt-1' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:26}}>
                        <FontAwesome5
                                name='rupee-sign'
                                size={26}
                                color="#fff"
                                  /> {balance}
                </Text>
            </View>

            <TouchableOpacity   onPress={()=>{setactive(!active)}} style={{backgroundColor:"white",padding:10,marginVertical:12,paddingHorizontal:20,
                                    borderRadius:10,borderColor:"#d7261b",borderWidth:3}}>
              <Text style={{color:"#d7261b",fontWeight:700}}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor:"#492d33",borderBottomRightRadius:7,borderBottomLeftRadius:7}}>

            <View style={{flexDirection:"row",paddingBottom:3,paddingTop:15,paddingLeft:50}}>
              <View style={{flexDirection:"row"}}>
              <FontAwesome5
                                  style={{marginTop:5}}
                                  name='rupee-sign'
                                  size={22}
                                  color="#fff"
                                    /> 
                <Text style={{color:"white", fontSize:22, marginLeft:5,fontFamily:"Roboto-Medium",}}>
                  {spent}
                </Text>
              </View>
              <Text style={{color:"#cbc4c5",marginLeft:10,marginTop:5 ,fontSize:16, marginLeft:20,fontFamily:"Roboto-Medium",}}>
                : Amount spent this month
              </Text>
            </View>
            <Text style={{color:"#fff", fontSize:20, marginLeft:40,fontFamily:"Roboto-Medium",}}>---------------------------------------------------</Text>
            <View style={{flexDirection:"row",paddingBottom:20,paddingLeft:50}}>
              <View style={{flexDirection:"row"}}>
              <FontAwesome5
                                  style={{marginTop:5}}
                                  name='rupee-sign'
                                  size={22}
                                  color="#fff"
                                    /> 
                <Text style={{color:"white", fontSize:22, marginLeft:5,fontFamily:"Roboto-Medium",}}>
                 {balance-spent}
                </Text>
              </View>
              <Text style={{color:"#cbc4c5",marginLeft:10,marginTop:5 ,fontSize:16, marginLeft:20,fontFamily:"Roboto-Medium",}}>
                : Remaining Balance
              </Text>
            </View>
          </View>
          {error && 
                          // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
                            <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
                          // </View>
                      }
          <ScrollView style={{height:450}}>
             {isVisible && <Donut/>}
          </ScrollView>

        <TouchableOpacity
            onPress={()=>{setIsVisible(!isVisible)}}
            style={{
              borderColor:"red",
              borderWidth:3,
              padding: 15,
              borderRadius: 10,
              marginBottom: 30,
              marginTop:10,
              marginHorizontal:20
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 16,
                color: '#fff',
              }}>
             Analyse the Remaining Balance
            </Text>
        </TouchableOpacity>
        </View>
        {/*Total Expensea! end */}
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
                        height :300 ,
                        minWidth:'90%',
                        borderRadius : 15,
                        alignItems : "center",
                        justifyContent : "center",
                        borderColor : "white",
                        borderWidth:2,
                      }}>
                    <Text style={ {
                          fontWeight:"500",
                          fontSize : 20,
                          color : "white",
                          marginBottom:30,
                          paddingTop:30
                        }}>Set new monthly balance</Text>
                       <View className=' border-solid border-2 w-full border-b-gray-400'  style={{flexDirection:"row"}}>
                          <FontAwesome5
                              name='rupee-sign'
                              size={26}
                              color="#9ca3af"
                              style={{marginRight: 5}}
                            />
                            <TextInput  
                               placeholderTextColor={"#9ca3af"}
                               value={balance}
                               onChangeText={(e)=>setBalance(e)}
                               placeholder='Enter the amount'
                                 style={{paddingVertical:0, color:"white",minWidth:'75%',fontSize:24}}/>
                          </View>        

        <View style={{flex:0,flexDirection:'row',marginTop:20}}>
                   <TouchableOpacity
                         style={{
                          backgroundColor: '#492d33',
                          padding: 15,
                          borderRadius: 10,
                          marginBottom: 30,
                          width:'25%',
                          marginTop:5,
                          marginRight:10
                        }}
                          onPress={()=>{setactive(!active)
                                        setError(null)}}>
                            <Text style={ {
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#fff',
                        }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                         style={{
                          backgroundColor: '#d7261b',
                          padding: 15,
                          borderRadius: 10,
                          marginBottom: 30,
                          width:'40%',
                          marginTop:5
                        }}
                          onPress={changeBalance}>
                            <Text style={ {
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#fff',
                        }}>Confirm</Text>
                  </TouchableOpacity>
        </View>

            </View>
          </View>
        </Modal>
    </SafeAreaView>
);
}

export default Graph