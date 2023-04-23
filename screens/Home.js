import { View, Text, TouchableOpacity,ScrollView,Modal, TextInput } from 'react-native'
import React, {useState}  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Groups from '../partials/Groups'
import DashGroup from '../partials/DashGroup'
import Expense from '../partials/Expense'
import DropdownComponent from '../partials/DropdownComponent'
import DatePicker from '../partials/DatePicker'

const Home = ({navigation}) => {
  const [active , setactive] = useState(false);
  const [expactive , setexpactive] = useState(false);



  return (

    <SafeAreaView style={{flex:1, backgroundColor:"#0d0f14"}}>
   {/*Padding Horizontal start*/}
     <View  style={{paddingHorizontal:15}}>
      {/*Hi Dipankar! start */}
        <View style={{marginTop:5, flexDirection:'row'}}>
            <Ionicons name="person-circle" size={50} color="#9ca3af"/>
            <Text style={{color:"white",marginTop:12, fontSize:20, marginLeft:5,fontFamily:"Roboto-Medium",marginRight:180}}>Hi, Dipankar!</Text>
            <TouchableOpacity
                  onPress={()=>{navigation.navigate("Login")}}>
                        <SimpleLineIcons
                            style={{marginTop:10}}
                            name='logout'
                            size={28}
                            color="#9ca3af"  />
            </TouchableOpacity>          
        </View>
        {/*Hi Dipankar! End */} 
        {/*Total Expensea! start */}
        <View  style={{backgroundColor:"#e44816"}}   className='rounded-md h-28 w-full p-5 mt-2 text-center'>
            <Text  style={{color:"white", fontSize:16, marginLeft:5,fontFamily:"Roboto-Medium",}}>Total Expenses</Text>
            <Text    className='font-bold mt-1 ml-2' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:30}}>
                     <FontAwesome5
                            name='rupee-sign'
                            size={30}
                            color="#fff"
                              /> 4,543
             </Text>
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
                        height :'35%' ,
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
                        }}>Create a group</Text>
                       <View className=' border-solid border-2 w-full border-b-gray-400'  style={{flexDirection:"row"}}>
                          <MaterialIcons
                              name='groups'
                              size={30}
                              color="#9ca3af"
                              style={{marginRight: 5}}
                            />
                            <TextInput   placeholderTextColor={"#9ca3af"} placeholder='Enter the group name'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>
               <View style={{flex:0,width:"90%"}}>
               <DropdownComponent />
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
                          onPress={()=>{setactive(!active)}}>
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
          </View>
        </Modal>

       {/*Groups text start */}
        <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',marginTop:25}}>
            <Text  className='font-bold'   style={{color:"white", fontSize:16,fontFamily:"Roboto-Medium",}}>Groups:</Text>
            <TouchableOpacity
              onPress={()=>{setactive(!active)}}
              className='rounded' style={{backgroundColor:"#cbc4c5"}}>
            <Text   style={{color:"black", fontSize:16,fontFamily:"Roboto-Medium", padding:5, paddingHorizontal:15,}}>Create Group</Text>
            </TouchableOpacity>
        </View>
        {/*Groups text end */}
        {/*Groups Boxes start */}
        <ScrollView horizontal={true} className=' h-32'>
          <View  style={{flex:0,flexDirection:'row' ,justifyContent:'space-evenly',alignContent:'space-between', marginTop:6,}}>
            <DashGroup iname="shopping-basket" name="Ration" amount={1500} nav={navigation}/>
            <DashGroup iname="restroom" name="Rent" amount={3300} nav={navigation}/>
          </View>
        </ScrollView>
        {/*Groups Boxes end */}

        {/*Personal text start */}
        <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',marginTop:40}}>
            <Text   className='font-bold'   style={{color:"white", fontSize:16,fontFamily:"Roboto-Medium",}}>Personal Expenses:</Text>
            <TouchableOpacity className='rounded'>
            <Text   className='font-bold'  style={{color:"#e44816", fontSize:16,fontFamily:"Roboto-Medium",}}>View all</Text>
             </TouchableOpacity>
        </View>
         {/*Personal text END*/}
         {/*Personal Expenses start */}
        <View style={{flex:0,flexDirection:'column',marginTop:3,maxHeight:320}}>
          <ScrollView>
            <Expense iname="fast-food-outline" name="Expense" date="20-05-2023" amount={199}/>
            <Expense iname="medical-outline" name="Blood Test" date="10-05-2023" amount={499}/>
          </ScrollView>
        </View>
         {/*Personal Expenses END */}
     </View>
    {/*Padding Horizontal END*/}

    {/*Add Expense start*/}
      <View style={{flex:1,justifyContent:"flex-end", }}>
         <View  className=' rounded-md h-24 w-full bg-zinc-800'>
          <TouchableOpacity
                onPress={()=>{setexpactive(!expactive)}}
                style={{
                  backgroundColor: '#d7261b',
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginTop:20,
                  marginHorizontal:10
                }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 16,
                      color: '#fff',
                    }}>
                  Add Expense
                  </Text>
            </TouchableOpacity>
         </View>
      </View>
     {/*Add Expense END*/}

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
                        height :400 ,
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

                          <View style={{flex:0,flexDirection:"row",width:"73%"}}>
                            <View>
                            <DropdownComponent/>
                            </View>

                              <View className='border-solid border-2 border-b-gray-400 mt-3 ml-3'  style={{flexDirection:"row"}}>
                                <MaterialIcons
                                    name='date-range'
                                    size={30}
                                    color="#9ca3af"
                                    style={{marginRight: 5}}
                                  />
                                  <View style={{paddingTop:5}}>
                                   <DatePicker/>
                                  </View>
                                 
                              </View>
                          </View>

                        
        <View style={{flex:0,flexDirection:'row',marginTop:35}}>
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
                          onPress={()=>{setexpactive(!expactive)}}>
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
          </View>
        </Modal>
    </SafeAreaView>

  )
}

export default Home