import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, ScrollView, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React, {useState,useEffect} from 'react'
import Tabs from '../partials/Tabs'
import { FloatingAction } from "react-native-floating-action";
import DatePicker from '../partials/DatePicker'
import DropdownComponent from '../partials/DropdownComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Share from '../partials/Share'
import LinearGradient from 'react-native-linear-gradient'
import { useAuthContext } from '../hooks/useAuthContext'
import { useExpenseContext } from '../context/ExpenseContext'


const GroupInfo = ({navigation,route}) => {
 
  //getting data from Context
  const {user}=useAuthContext()
  const { groups, setGroups } = useExpenseContext()
  
  //to show errors from databasse
  const [error,setError]=useState(null)

  //id of single group
  const { id } = route.params;
  const [groupData,setGroupData] = useState(groups.filter(group=>group._id===id))

  //add member modal
  const [active , setactive] = useState(false);
  //add group expense modal
  const [expactive , setexpactive] = useState(false);
  //set expenses | balance tab
  const [activeTab, setActiveTab] = useState(0);
  //add member modal details
  const [memberEmail, setMemberEmail] = useState("")
  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };
 
  const [shares,setShares] = useState(groupData[0].members.map((member) => {
    return { ...member, share: 1 };
  }))

  //fetch the single group
  useEffect(()=>{
    console.log("useEffect called")
    const fetchGroupData = async () => {
      const response = await fetch('http://10.0.2.2:4000/groups/'+id,{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok){
        // console.log("from Group Menu ",json)
        setGroupData([json])

      }
    }
  

    if (user) {

      fetchGroupData()
    }

  },[groups])

  // console.log("Shares " ,shares)
  //remove Member
  const deleteMember=async(mEmail)=>{
    if(!user){
      setError("You must be logged in")
     }
     
    //checking groupBalance has no -negative balance
    const isRemovable = groupData[0].members.filter(m=>{
      if(m.memberEmail===mEmail){
        if(m.groupBalance>=0){
          return true
        }else{
          return false
        }
      }else{ return false}
     })

     if(isRemovable){
      const response = await fetch('http://10.0.2.2:4000/dashboard/groups/members/'+id,{
        method:'PATCH',
        body:JSON.stringify({mEmail}),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
  
      const json = await response.json()
      if(!response.ok){
        setError(json.error)
      }
      if(response.ok){
        setGroups(groups.map(group=>{
          if(group._id===id){
            return {...group, json}
          }else{
            return group
          }
        }))
       
        setError(null)
      }
     }else{
      setError("User has Dues left")
     }    

  }

  //add member
  const addMember=async ()=>{
    if(!user){
     setError("You must be logged in")
    }
    const memberDetails={memberEmail,groupBalance:0}
    const response = await fetch('http://10.0.2.2:4000/dashboard/groups/'+id,{
      method:'PATCH',
      body:JSON.stringify(memberDetails),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    if(!response.ok){

      setError(json.error)
      setactive(true);
      // setMemberName('')
    }
    if(response.ok){
      setactive(false);
      // console.log("From json",json)
      setGroups(groups.map(group=>{
        if(group._id===id){
          return {...group, json}
        }else{
          return group
        }
      }))
      setMemberEmail('')
      setError(null)
     
      // setMemberName('')
    }
  }


 //Add expense
//  const handleSubmit=async()=>{

//   let temp=groupData
//   const newExpense = {
//     amount:temp[0].amount+parseInt(currAmount),
//     groupExpenses:[...temp[0].groupExpenses,{
//                                               title,category,
//                                               date,amount:parseInt(currAmount),
//                                             }],
//     members:temp[0].members.map(member=> {return {...member,groupBalance:member.groupBalance+currAmount/temp[0].members.length}})
//   }

//     console.log('from updated Group:',newExpense)
//     if(!user){
//       console.log("You must be logged in")
//      }
//      const response = await fetch('http://10.0.2.2:4000/dashboard/groups/expense/'+id,{
//        method:'PATCH',
//        body:JSON.stringify(newExpense),
//        headers:{
//          'Content-Type': 'application/json',
//          'Authorization': `Bearer ${user.token}`
//        }
//      })
 
//      const json = await response.json()
//      if(response.ok){
//       setGroups(groups.map(group=>{
//         if(group._id===id){
//           return {...group, json }
//                       }else{
//           return group
//         }
//       }))
  
//       setAmount(0)
//       setTitle('')
//       setCategory("General")
//       setDate(currDate)
//       handleClose()
  
//      }

// }




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
    icon: <FontAwesome5 name="file-invoice"  size={18} color="#d7261b"/>,
    name: "add_expense",
    position: 1,
    color:"white"
  },
  {
    text: "Add member",
    icon: <Ionicons name="person-add-sharp"  size={18} color="#d7261b"/>,
    name: "add_member",
    position: 2,
    color:"white"
  },
 
];
  return (

    <SafeAreaView style={{flex:1, backgroundColor:"#0d0f14"}}>
      <StatusBar backgroundColor="#0d0f14"/>
   {/*Padding Horizontal start*/}
     <View  style={{paddingHorizontal:15}}>
      {/*Back button */}
        <View style={{marginTop:5, flexDirection:'row'}}>
             <TouchableOpacity
                  onPress={()=>{navigation.navigate("Dash")}}>
                         <Ionicons name="arrow-back" size={40} color="#9ca3af"/>
            </TouchableOpacity>          
        </View>
        {/*Back button End */} 
        {/*Group Info! start */}
        <LinearGradient colors={['#e44816','#d7261b']}   style={{backgroundColor:"#e44816",marginBottom:10}}   className='rounded-md h-28 w-full p-5 mt-2 text-center'>
             <Text    className='font-bold mt-1 ' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:30}}>
                 Group: {groupData[0].groupTitle}
             </Text>
             <Text  style={{color:"white", fontSize:16, marginLeft:5,fontFamily:"Roboto-Medium",}}>Created by: You</Text>
        </LinearGradient>
        {/*Group Info! end */}
        {error && 
        // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
           <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
        // </View>
         }
        {/* members */}
         <View style={{flex:0,flexDirection:'row'}}>
         {groupData[0].members.length>0 && groupData[0].members.map((member,idx)=>{ if(idx===0){
                                                                               return   <View  key={member.memberEmail}  style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center',flexDirection:'row'}}   className='rounded-md pb-1 px-3 mr-1'>
                                                                                            <Text  className='font-bold'  style={{color:"white", fontSize:15,fontFamily:"Roboto-Medium",marginTop:5}}>{member.memberName}</Text> 
                                                                                        </View>
                                                                             }else{
                                                                                     return  <View   key={member.memberEmail} style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center',flexDirection:'row'}}   className='rounded-md pb-1 px-3'>
                                                                                               <Text  className='font-bold'  style={{color:"white", fontSize:15,fontFamily:"Roboto-Medium",marginTop:5}}>{member.memberName}</Text> 
                                                                                               <TouchableOpacity onPress={()=>{deleteMember(member.memberEmail)}}>
                                                                                                <Ionicons style={{marginTop:4, marginLeft:4}} name='close' size={20} color="#fff" />              
                                                                                               </TouchableOpacity>
                                                                                             </View>
                                                                             }
                                                                            })}

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
{/* add member Modal */}
  <Modal
          animationType="slide"
          transparent={true}
          visible={active}
          onRequestClose={() => {
            // console.warn("closed");
          }}
          >
          <View style={{    flex: 1,
                            backgroundColor : "black",
                            alignItems: 'center',
                            justifyContent: 'center',}}>
            <View  style={ {
                        backgroundColor : "black" ,
                        height :340 ,
                        minWidth:'90%',
                        borderRadius : 15,
                        alignItems : "center",
                        justifyContent : "center",
                        borderColor : "white",
                        borderWidth:2,
                      }}>
                    <Text  style={ {
                          fontWeight:"500",
                          fontSize : 20,
                          color : "white",
                          marginBottom:30,
                          paddingTop:30
                        }}>Add member</Text>
                       <View className=' border-solid border-2 w-full border-b-gray-400'  style={{flexDirection:"row"}}>
                          <MaterialIcons
                              name='alternate-email'
                              size={23}
                              color="#9ca3af"
                              style={{marginRight: 5}}
                            />
                            <TextInput   placeholderTextColor={"#9ca3af"} placeholder="Enter the member's email"
                                          value={memberEmail}
                                          onChangeText={(txt)=>{setMemberEmail(txt)}}
                                          style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>
                          {error && 
                            // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
                              <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
                            // </View>
                        }

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
                          onPress={()=>{setactive(false)
                                        setError(false)}}>
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
                          onPress={addMember}>
                            <Text style={ {
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#fff',
                        }}>Add member</Text>
                  </TouchableOpacity>
        </View>
            </View>
          </View>
        </Modal>

        {/* add group expense */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={expactive}
          onRequestClose={() => {
            // console.warn("closed");
          }}
          >
          <View style={{    flex: 1,
                            backgroundColor : "black",
                            alignItems: 'center',
                            justifyContent: 'center',}}>
            <View  style={ {
                        backgroundColor : "black" ,
                        height :600 ,
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
                          {/* Splitting  */}
                          <View>
                           <Text style={{fontWeight:"bold" ,color:"white", fontSize:16,fontFamily:"Roboto-Medium",marginTop:10}}>Split:</Text> 

                           <View style={{marginTop:10, width:300}}>
                            <View style={{ flexDirection: 'row',borderColor:"#cbc4c5",backgroundColor:"#cbc4c5",borderWidth:3,borderRadius:5}}>
                              <TouchableOpacity
                                onPress={() => handleTabPress(0)}
                                style={{
                                  backgroundColor: activeTab === 0 ? '#0d0f14' : '#cbc4c5',
                                  padding: 10,
                                  flex: 1,
                                  alignItems: 'center',
                                  borderRadius:7
                                }}
                              >
                                <Text
                                style={{ color: activeTab === 0 ? '#cbc4c5' : '#0d0f14',}}>Equally</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handleTabPress(1)}
                                style={{
                                  backgroundColor: activeTab === 1 ? '#0d0f14' : '#cbc4c5',
                                  padding: 10,
                                  flex: 1,
                                  alignItems: 'center',
                                  borderRadius:7
                                }}
                              >
                                <Text style={{ color: activeTab === 1 ? '#cbc4c5' : '#0d0f14'}}>By Share</Text>
                              </TouchableOpacity>

                            </View>

                            {activeTab === 0 && (
                              <View>
                                {groupData[0].members.map(m=>{
                                      return(
                                        <View style={{marginTop:10,flexDirection: 'row',justifyContent:"space-between",borderColor:"#cbc4c5",borderWidth:2,borderRadius:5,padding:10}}>
                                        <Text style={{color:"white"}}>{m.memberName}</Text>
                                        <View>
                                        <Text   style={{color:"#b5807f", fontSize:16,fontFamily:"Roboto-Medium", marginRight:10}}>
                                          <FontAwesome5 name='rupee-sign' size={16} color="#b5807f"/> 500
                                        </Text> 
                                        </View>
                                        </View>
                                        )
                                })}


                                {/* <View style={{marginTop:10,flexDirection: 'row',justifyContent:"space-between",borderColor:"#cbc4c5",borderWidth:2,borderRadius:5,padding:10}}>
                                  <Text style={{color:"white"}}>Dipankar Prasad</Text>
                                  <View>
                                  <Text   style={{color:"#b5807f", fontSize:16,fontFamily:"Roboto-Medium", marginRight:10}}>
                                    <FontAwesome5 name='rupee-sign' size={16} color="#b5807f"/> 500
                                  </Text> 
                                  </View>
                                </View> */}
                              </View>

                          
                            )}
                            {activeTab === 1 && (
                              <View>
                             {
                                shares.map(m=>{return(<Share name={m.memberName} count={m.share} shares={shares} key={m._id} id={m._id} setShare={setShares} amount={500}/> )})}

                               
                                {/* <Share name="Dipankar Prasad" amount="500"/> */}
                            </View>
                            )}

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

export default GroupInfo