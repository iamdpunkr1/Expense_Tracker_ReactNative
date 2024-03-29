import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React, {useState,useEffect} from 'react'
import Tabs from '../partials/Tabs'
import { FloatingAction } from "react-native-floating-action";
import DatePicker from '../partials/DatePicker'
import DropdownComponent from '../partials/DropdownComponent'
import Share from '../partials/Share'
import LinearGradient from 'react-native-linear-gradient'
import { useAuthContext } from '../hooks/useAuthContext'
import { useExpenseContext } from '../context/ExpenseContext'


const GroupInfo = ({navigation,route}) => {
 
  //getting data from Context
  const {user}=useAuthContext()
  const { groups, setGroups, toggle, setToggle } = useExpenseContext()
  
  //to show errors from databasse
  const [error,setError]=useState(null)

  //add group expense states
  const [amount, setAmount] = useState('0');
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  //date
  let today = new Date()
  let currDate = today.getDate() + '-' + parseInt(today.getMonth() + 1) + '-' +today.getFullYear() 
  const [date, setDate] = useState(currDate)
  //id of single group
  const { id } = route.params;
  const [groupData,setGroupData] = useState(null)

  //add member modal
  const [active , setactive] = useState(false);
  
  //add member modal
  const [edit , setEdit] = useState(false);

  //add group expense modal
  const [expactive , setexpactive] = useState(false);
  //set expenses | balance tab
  const [activeTab, setActiveTab] = useState(0);
  //add member modal details
  const [memberEmail, setMemberEmail] = useState("")
  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };
 
  //to split expense into shares
  const [shares,setShares] = useState(null)

  //to get index of the expense to be edited
  const [index,setIndex] = useState(null)

  //fetch the single group
  useEffect(()=>{
    console.log("useEffect GROUP")
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
        setShares(json.members.map((member) => {
          return { ...member, share: 1 };
        }))
      
      }
    }
  

    if (user) {
      fetchGroupData()
    }

  },[groups])


  //remove Member
  const deleteMember=async(mEmail)=>{
    if(!user){
      setError("You must be logged in")
      return
     }
     
    //checking groupBalance has no -negative balance
    const isRemovable = groupData[0].members.filter(m=>{
      if(m.memberEmail===mEmail){
        if(m.groupBalance===0){
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
      //  setShares(groupData[0].members.map((member) => {
      //     return { ...member, share: 1 };
      //   }))
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
      setGroupData(groups.filter(group=>group._id===id))
      // setMemberName('')
    }
  }


 //Add expense
 const handleSubmit=async()=>{
  const value=(mEmail,sum)=>{
    const [m]= shares.filter(m=>{if(m.memberEmail===mEmail){ return m}})
 
      return ((amount / sum) * m.share)%1===0?parseInt((amount / sum) * m.share).toFixed(0):parseInt((amount / sum) * m.share).toFixed(2)
 
    }

  let temp=groupData
  let newExpense='';
  if(activeTab===0){
    // console.log("handle submit 1")
    newExpense = {
      amount:temp[0].amount+parseFloat(amount),
      groupExpenses:[...temp[0].groupExpenses,{
                                                title,category,
                                                date,amount:parseInt(amount),
                                                method:"equally",
                                                shares:temp[0].members.map((member) => {
                                                  return { ...member, share: 1, balance:parseFloat(amount/temp[0].members.length)};
                                                })
                                              }],
      members:temp[0].members.map(member=> {return {...member,groupBalance:member.groupBalance+parseFloat(amount/temp[0].members.length)}})
    }
  }else{
   
    const sum = shares.reduce((acc, { share }) => acc + share, 0);


    newExpense = {
      amount:temp[0].amount+parseInt(amount),
      groupExpenses:[...temp[0].groupExpenses,{
                                                title,
                                                category,
                                                date,
                                                method:"byShare",
                                                amount:parseFloat(amount),
                                                shares:shares.map(m=> ({...m,balance:parseFloat(value(m.memberEmail, sum))}))
                                              }],
      members:temp[0].members.map(member=> {return {...member,groupBalance:member.groupBalance + parseFloat(value(member.memberEmail, sum))}})
    }
  }
 

//     console.log('from updated Group:',newExpense)
    if(!user){
      setError("You must be logged in")
     }
    
     const response = await fetch('http://10.0.2.2:4000/dashboard/groups/expense/'+id,{
       method:'PATCH',
       body:JSON.stringify(newExpense),
       headers:{
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${user.token}`
       }
     })
 
     const json = await response.json()

     if(!response.ok){
      setError(json.error)
      console.log("Not OK",json)
     }



     if(response.ok){
      
      setGroups(groups.map(group=>{
        if(group._id===id){
          return {...group, json }
                      }else{
          return group
        }
      }))
  
      setAmount(0)
      setTitle('')
      setCategory("General")
      setDate(currDate)
      setError(null)
      setexpactive(false)
      setToggle(!toggle)
  
     }

}

//delete group expense
const deleteGroupExpense = async(gid)=>{

  console.log("Deleteed exp",gid)

  let [temp]=groupData[0].groupExpenses.filter((exp,idx)=>idx===gid)

  const value=(mEmail,sum)=>{
    const [m]= temp.shares.filter(m=>{if(m.memberEmail===mEmail){ return m}})
    if(m){
      return ((temp.amount / sum) * m.share)%1===0?parseInt((temp.amount / sum) * m.share).toFixed(0):parseInt((temp.amount / sum) * m.share).toFixed(1)
    }else{
      return 0
    }

    }



  const sum = temp.shares.reduce((acc, { share }) => acc + share, 0);

  const newExpense = {
      amount:groupData[0].amount-parseFloat(temp.amount),
      groupExpenses:groupData[0].groupExpenses.filter((exp,idx)=> idx!=gid),
      members:groupData[0].members.map(member=> {return {...member,groupBalance:member.groupBalance - parseFloat(value(member.memberEmail, sum))}})
    
  }
 

    // console.log('from Deleted:',newExpense)
    if(!user){
      setError("You must be logged in")
     }
    
     const response = await fetch('http://10.0.2.2:4000/dashboard/groups/expense/delete/'+id,{
       method:'PATCH',
       body:JSON.stringify(newExpense),
       headers:{
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${user.token}`
       }
     })
 
     const json = await response.json()

     if(!response.ok){
      setError(json.error)
      console.log("Not Deleted",json.error)
     }

     if(response.ok){
      setGroups(groups.map(group=>{
        if(group._id===id){
          return {...group, json }
                      }else{
          return group
        }
      }))
  
      setError(null)
      setToggle(!toggle)
  
     }

}

//to show edit modal and load the expense details
const showEdit=(exp)=>{
  setIndex(exp)
  setEdit(true)

  const [temp] = groupData[0].groupExpenses.filter((e,idx)=>idx===exp)
  setAmount(temp.amount.toString())
  setTitle(temp.title)
  setCategory(temp.category)
  setDate(temp.date)
  setShares(temp.shares)
  if(temp.method==="equally"){
    handleTabPress(0)
  }else{
    handleTabPress(1)
  }

}

//to hide the edit modal option
const hideEdit=()=>{
  setEdit(false)
  setAmount('0')
  setTitle('')
  setCategory('')
  setDate(currDate)
  setShares(groupData[0].members.map((member) => {
    return { ...member, share: 1 };
  }))
  setIndex(null)
}

//to submit changes of the expense
const handleEdit=async()=>{

  if(!user){
    setError("You must be login")
    return
  }

  const temp=groupData
  let newExpense='';
  const [prev] = groupData[0].groupExpenses.filter((e,idx)=>idx===index)
  
  //old byShare value to be subtracted
  const oldValue=(mEmail,sum)=>{
    const [m]= prev.shares.filter(m=>{if(m.memberEmail===mEmail){ return m}})
    if(m){
      return ((prev.amount / sum) * m.share)%1===0?parseInt((prev.amount / sum) * m.share).toFixed(0):parseInt((prev.amount / sum) * m.share).toFixed(1)
    }else{
      return 0
    }

    }
  //old byShare value to be Added
  const newValue=(mEmail,sum)=>{
      const [m]= shares.filter(m=>{if(m.memberEmail===mEmail){ return m}})
       if(m){
        return ((amount / sum) * m.share)%1===0?parseInt((amount / sum) * m.share).toFixed(0):parseInt((amount / sum) * m.share).toFixed(1)
      }else{
        return 0
      }
    }
  console.log("Outside index: ",index)
  if(index>=0){
    console.log("inside index: ",index)
    if(activeTab===0){
      newExpense = {
        amount:(temp[0].amount- prev.amount)+parseFloat(amount),
        groupExpenses:temp[0].groupExpenses.map((exp,idx)=>{
              if(idx===index){
                return{
                  title,category,
                  date,amount:parseFloat(amount),
                  method:"equally",
                  shares:prev.shares.map((member) => {
                    return { ...member, share: 1,balance:parseFloat(amount/prev.shares.length)};
                  })
                }
              }else{
                return exp
              }
        })
        ,
        members:temp[0].members.map(member=> {return {...member,groupBalance:(member.groupBalance - prev.amount/prev.shares.length )+parseFloat(amount/prev.shares.length)}})
      }
    }else{
      const prevSum = prev.shares.reduce((acc, { share }) => acc + share, 0);
      const sum = shares.reduce((acc, { share }) => acc + share, 0);
      newExpense = {
        amount:(temp[0].amount-prev.amount)+parseFloat(amount),
        groupExpenses:temp[0].groupExpenses.map((exp,idx)=>{
              if(idx===index){
                return{
                  title,category,
                  date,amount:parseFloat(amount),
                  method:"byShare",
                  shares:shares.map(m=> {
                                          return{
                                              ...m,
                                              balance:parseFloat(newValue(m.memberEmail, sum))
                                          }})
                }
              }else{
                return exp
              }
        })
        ,
        members:temp[0].members.map(member=> {return {...member,groupBalance:(member.groupBalance-parseFloat(oldValue(member.memberEmail, prevSum))) + parseFloat(newValue(member.memberEmail, sum))}})
      }
    }
  }

  const response = await fetch('http://10.0.2.2:4000/dashboard/groups/update/'+id,{
    method:'PATCH',
    body:JSON.stringify(newExpense),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    }
  })

  const json = await response.json()

  if(!response.ok){
   setError(json.error)
   console.log("Not Updated",json.error)
  }

  if(response.ok){
   setGroups(groups.map(group=>{
     if(group._id===id){
       return {...group, json }
                   }else{
       return group
     }
   }))

   setError(null)
   setToggle(!toggle)
   setEdit(false)
   setAmount('0')
   setTitle('')
   setCategory('')
   setDate(currDate)
   setShares(groupData[0].members.map((member) => {
     return { ...member, share: 1 };
   }))
   setIndex(null)
  }




}

const isGroupAdmin =(name)=>{
  if(name===(user && user.user.username)){
    return true
  }else{
    return false
  }
}
 const floatData=[
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
 const actions = floatData.filter(item=>{
  if(item.position===2){
    if(isGroupAdmin(groupData && groupData[0].createdBy)){
      return item
    }else{
      return ''
    }
  }else{
      return item
  }
 })

 
  //show activity indicator while loading
 if(!groupData){
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center", backgroundColor:"#0d0f14"}} >
    <StatusBar backgroundColor="#0d0f14"/>
      <ActivityIndicator size="large" color="#d3d3d3" />
    </SafeAreaView>
    )
  }
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
             <Text    className='font-bold mt-1 ml-1' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:30}}>
                 {groupData && groupData[0].groupTitle}
             </Text>
             <Text  style={{color:"white", fontSize:16, marginLeft:5,fontFamily:"Roboto-Medium",}}>Created by: {isGroupAdmin( groupData && groupData[0].createdBy)===true? 'You':  groupData && groupData[0].createdBy}</Text>
        </LinearGradient>
        {/*Group Info! end */}
        {error && 
        // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
           <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
        // </View>
         }
        {/* members */}
         <View style={{flex:0,flexDirection:'row',flexWrap:'wrap'}}>
         {groupData && (groupData[0].members.length>0 && groupData[0].members.map((member,idx)=>{ if(idx===0){
                                                                               return   <View  key={member.memberEmail}  style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center',flexDirection:'row'}}   className='rounded-md pb-1 px-3 mr-1 mb-2'>
                                                                                            <Text  className='font-bold'  style={{color:"white", fontSize:15,fontFamily:"Roboto-Medium",marginTop:5}}>{member.memberName}</Text> 
                                                                                        </View>
                                                                             }else{
                                                                                     return  <View   key={member.memberEmail} style={{backgroundColor:"#595b62",flex:0,justifyContent:'center',alignItems:'center',flexDirection:'row',marginRight:4}}   className='rounded-md pb-1 px-3 mb-2'>
                                                                                               <Text  className='font-bold'  style={{color:"white", fontSize:15,fontFamily:"Roboto-Medium",marginTop:5}}>{member.memberName}</Text> 
                                                                                              {(isGroupAdmin(groupData && groupData[0].createdBy) || (user.user.username===member.memberName))
                                                                                              ?
                                                                                              <TouchableOpacity onPress={()=>{deleteMember(member.memberEmail)}}>
                                                                                                <Ionicons style={{marginTop:4, marginLeft:4}} name='close' size={20} color="#fff" />              
                                                                                               </TouchableOpacity>:''} 
                                                                                             </View>
                                                                             }
                                                                            }))}

         </View>
         <View style={{flex:0,flexDirection:'column',maxHeight:'71%'}}>
            <Tabs deleteGroupExpense={deleteGroupExpense} groupExpenses={groupData && groupData[0].groupExpenses} 
                  balance={groupData && groupData[0].members} totalAmount={groupData && groupData[0].amount} showEdit={showEdit}/>
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
                              <TextInput  value={amount} onChangeText={(txt)=>{setAmount(txt)}} keyboardType={'numeric'}  placeholderTextColor={"#9ca3af"} placeholder='Enter the amount'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View className=' border-solid border-2 w-full border-b-gray-400 mt-3'  style={{flexDirection:"row"}}>
                            <FontAwesome5
                                name='file-invoice'
                                size={30}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput  value={title} onChangeText={(txt)=>{setTitle(txt)}}  placeholderTextColor={"#9ca3af"} placeholder='what was this expense for?'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View style={{flex:0,flexDirection:"row",width:"73%"}}>
                            <View>
                              <DropdownComponent  category={category} setCategory={setCategory}/>
                            </View>

                              <View className='border-solid border-2 border-b-gray-400 mt-3 ml-3'  style={{flexDirection:"row"}}>
                                <MaterialIcons
                                    name='date-range'
                                    size={30}
                                    color="#9ca3af"
                                    style={{marginRight: 5}}
                                  />
                                  <View style={{paddingTop:5}}>
                                   <DatePicker  date={date}
                                                setDate={setDate}/>
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
                                {groupData && groupData[0].members.map(m=>{
                                      return(
                                        <View key={m._id} style={{marginTop:10,flexDirection: 'row',justifyContent:"space-between",borderColor:"#cbc4c5",borderWidth:2,borderRadius:5,padding:10}}>
                                        <Text style={{color:"white"}}>{m.memberName}</Text>
                                        <View>
                                        <Text   style={{color:"#b5807f", fontSize:16,fontFamily:"Roboto-Medium", marginRight:10}}>
                                          <FontAwesome5 name='rupee-sign' size={16} color="#b5807f"/> {(amount/groupData[0].members.length)%1===0?(amount/groupData[0].members.length).toFixed(0):(amount/groupData[0].members.length).toFixed(1)}
                                        </Text> 
                                        </View>
                                        </View>
                                        )
                                })}


                              </View>

                          
                            )}
                            {activeTab === 1 && (
                              <View>
                             {shares &&
                                shares.map(m=>{return(<Share name={m.memberName} count={m.share} shares={shares} key={m._id} id={m._id} setShare={setShares} amount={amount}/> )})}

                               
                                {/* <Share name="Dipankar Prasad" amount="500"/> */}
                            </View>
                            )}

                          </View>
                          </View>
                          {error && 
                            // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
                              <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
                            // </View>
                        }
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
                          onPress={()=>{setexpactive(!expactive)
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
                          onPress={handleSubmit}>
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


       {/* EDIT group expense */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={edit}
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
                        }}>Edit Expense</Text>
                         <View className=' border-solid border-2 w-full border-b-gray-400'  style={{flexDirection:"row"}}>
                            <FontAwesome5
                                name='rupee-sign'
                                size={30}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput  value={amount} onChangeText={(txt)=>{setAmount(txt)}} keyboardType={'numeric'}  placeholderTextColor={"#9ca3af"} placeholder='Enter the amount'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View className=' border-solid border-2 w-full border-b-gray-400 mt-3'  style={{flexDirection:"row"}}>
                            <FontAwesome5
                                name='file-invoice'
                                size={30}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput  value={title} onChangeText={(txt)=>{setTitle(txt)}}  placeholderTextColor={"#9ca3af"} placeholder='what was this expense for?'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View style={{flex:0,flexDirection:"row",width:"73%"}}>
                            <View>
                              <DropdownComponent  category={category} setCategory={setCategory}/>
                            </View>

                              <View className='border-solid border-2 border-b-gray-400 mt-3 ml-3'  style={{flexDirection:"row"}}>
                                <MaterialIcons
                                    name='date-range'
                                    size={30}
                                    color="#9ca3af"
                                    style={{marginRight: 5}}
                                  />
                                  <View style={{paddingTop:5}}>
                                   <DatePicker  date={date}
                                                setDate={setDate}/>
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
                                {shares && shares.map(m=>{
                                      return(
                                        <View key={m._id} style={{marginTop:10,flexDirection: 'row',justifyContent:"space-between",borderColor:"#cbc4c5",borderWidth:2,borderRadius:5,padding:10}}>
                                        <Text style={{color:"white"}}>{m.memberName}</Text>
                                        <View>
                                        <Text   style={{color:"#b5807f", fontSize:16,fontFamily:"Roboto-Medium", marginRight:10}}>
                                          <FontAwesome5 name='rupee-sign' size={16} color="#b5807f"/> {(amount/shares.length)%1===0?(amount/shares.length).toFixed(0):(amount/shares.length).toFixed(1)}
                                        </Text> 
                                        </View>
                                        </View>
                                        )
                                })}


                              </View>

                          
                            )}
                            {activeTab === 1 && (
                              <View>
                             {shares &&
                                shares.map(m=>{return(<Share name={m.memberName} count={m.share} shares={shares} key={m._id} id={m._id} setShare={setShares} amount={amount}/> )})}

                               
                                {/* <Share name="Dipankar Prasad" amount="500"/> */}
                            </View>
                            )}

                          </View>
                          </View>
                          {error && 
                            // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
                              <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
                            // </View>
                        }
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
                          onPress={hideEdit}>
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
                          onPress={handleEdit}>
                            <Text style={ {
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#fff',
                        }}>Save Changes</Text>
                  </TouchableOpacity>
               </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  )
}

export default GroupInfo