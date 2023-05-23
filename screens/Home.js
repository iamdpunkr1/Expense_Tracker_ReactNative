import { View, Text, TouchableOpacity,ScrollView,Modal, TextInput, Image } from 'react-native'
import React, {useState, useEffect}  from 'react'
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
import LinearGradient from 'react-native-linear-gradient';
import { useAuthContext } from '../hooks/useAuthContext'
import { useExpenseContext } from '../context/ExpenseContext'

const Home = ({navigation}) => {
  //getting data from Context
  const {user}=useAuthContext()
  const { selfExpenses, setSelfExpenses,groups, setGroups } = useExpenseContext()
  
  //group modal
  const [active , setactive] = useState(false);

  //expense modal
  const [expactive , setexpactive] = useState(false);

  //expense states
  const [error, setError] = useState(null)
  const [amount, setAmount] = useState('0');
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  //date
  let today = new Date()
  let currDate = today.getDate() + '-' + parseInt(today.getMonth() + 1) + '-' +today.getFullYear() 
  const [date, setDate] = useState(currDate)
  //group states
  const [groupTitle, setGroupTitle] = useState("");
  const [groupCategory, setGroupCategory] = useState("General");
    // //refresh every time there is a change in expenses
    useEffect(()=>{
      const fetchSelfExpenses = async () => {
        const response = await fetch('http://10.0.2.2:4000/dashboard', {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
  
        if (response.ok) {
          setSelfExpenses(json)
        }
      }
  
      const fetchGroups = async () => {
        const response = await fetch('http://10.0.2.2:4000/dashboard/groups',{
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        })
  
        const json = await response.json()
  
        if(response.ok){
          setGroups(json)
        }
      }
    
  
      if (user) {
        fetchSelfExpenses()
        fetchGroups()
      }
  
  },[user,setSelfExpenses,setGroups])

  //Add expense
  const handleSubmit= async()=>{
    // e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }

    const expense = {title,amount,category,date}

    const response = await fetch('http://10.0.2.2:4000/dashboard', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      
    }
    if (response.ok) {
     // const expenseId= (Math.random() + 1).toString(36).substring(2);
      setSelfExpenses([...selfExpenses,json])
      setAmount('0')
      setTitle('')
      setCategory("General")
      setDate(currDate)
      setError(null)
      setexpactive(false)
     }
    }
  
  //delete a expense
  const deleteSelfExpense= async (_id)=>{
    if(!user){
        setError('You must be logged in')
          return
        }

    const response = await fetch('http://10.0.2.2:4000/dashboard/'+_id,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      const newExpenses=selfExpenses.filter(expense=> expense._id !== json._id )
      setSelfExpenses(newExpenses)
    }
    
  }

  //create groups
  const addGroup= async()=>{ 
    // e.preventDefault()
    if(!user){
      setError("You must be logged in")
    }
    const group={groupTitle, groupCategory,amount:0,createdBy:user.user.username,members:[{memberName:user.user.username, memberEmail:user.user.email, groupBalance:0}],groupExpenses:[]}
    const response = await fetch('http://10.0.2.2:4000/dashboard/groups',{
      method:'POST',
      body:JSON.stringify(group),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    if(response.ok){
          setGroups([...groups,json]) 
          setGroupTitle('')
          setGroupCategory("General")
          setDate(currDate)
          setError(null)
          setactive(false)
    }

  }
  return (

    <SafeAreaView style={{flex:1, backgroundColor:"#0d0f14"}}>
   {/*Padding Horizontal start*/}
     <View  style={{paddingHorizontal:15}}>
      {/*Hi Dipankar! start */}
        <View style={{marginTop:5, flexDirection:'row',justifyContent:"space-between"}}>
          <View style={{flexDirection:"row"}}>
          <Image
            source={require('../assets/user3.png')}
            style={{height: 55, width: 55}}
          />
            <Text style={{color:"white",marginTop:12, fontSize:20, marginLeft:5,fontFamily:"Roboto-Medium",}}>Hi, {user && user.user.username}</Text>
          </View>
      
            <TouchableOpacity
                  onPress={()=>{navigation.openDrawer()}}>
                        <MaterialIcons
                            style={{marginTop:10,}}
                            name='menu'
                            size={35}
                            color="#9ca3af"  />
            </TouchableOpacity>          
        </View>
        {/*Hi Dipankar! End */} 
        {/*Total Expensea! start */}
        <LinearGradient colors={['#e44816','#d7261b']}   style={{backgroundColor:"#e44816"}}   className='rounded-md h-28 w-full p-5 mt-2 text-center'>
            <Text  style={{color:"white", fontSize:16, marginLeft:5,fontFamily:"Roboto-Medium",}}>Total Expenses</Text>
            <Text    className='font-bold mt-1 ml-2' style={{fontFamily:"Roboto-Medium", color:"white",fontSize:30}}>
                     <FontAwesome5
                            name='rupee-sign'
                            size={30}
                            color="#fff"
                              /> 4,543
             </Text>
        </LinearGradient>
        {/*Total Expensea! end */}
        {/* group modal */}
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
                        }}>Create a group</Text>
                       <View className=' border-solid border-2 w-full border-b-gray-400'  style={{flexDirection:"row"}}>
                          <MaterialIcons
                              name='groups'
                              size={30}
                              color="#9ca3af"
                              style={{marginRight: 5}}
                            />
                            <TextInput   placeholderTextColor={"#9ca3af"} placeholder='Enter the group name'
                                          value={groupTitle} onChangeText={(txt)=>{setGroupTitle(txt)}}
                                          style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>
               <View style={{flex:0,width:"90%"}}>
               <DropdownComponent  category={groupCategory} setCategory={setGroupCategory}/>
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
                                    onPress={addGroup}>
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
            <Text  className='font-bold'   style={{color:"white", fontSize:18,fontFamily:"Roboto-Medium",}}>Groups</Text>
            <TouchableOpacity
              onPress={()=>{setactive(!active)}}
              className='rounded' style={{backgroundColor:"#b5807f"}}>
            <Text   style={{color:"black", fontSize:18,fontFamily:"Roboto-Medium", paddingHorizontal:15,fontWeight:"bold"}}>+</Text>
            </TouchableOpacity>
        </View>
        {/*Groups text end */}
        {/*Groups Boxes start */}
        <ScrollView horizontal={true} className=' h-32'>
          <View  style={{flex:0,flexDirection:'row' ,justifyContent:'space-evenly',alignContent:'space-between', marginTop:6,}}>
          {groups.length>0 && groups.map((grp)=><DashGroup groupData={grp} nav={navigation} key={grp._id}  />)} 
            {/* <DashGroup iname="shopping-basket" name="Ration" amount={1500} nav={navigation}/>
            <DashGroup iname="restroom" name="Rent" amount={3300} nav={navigation}/> */}
          </View>
        </ScrollView>
        {/*Groups Boxes end */}

        {/*Personal text start */}
        <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',marginTop:40}}>
            <Text   className='font-bold'   style={{color:"white", fontSize:18,fontFamily:"Roboto-Medium",}}>Recent Expenses</Text>
            <TouchableOpacity className='rounded' onPress={()=>navigation.navigate("Expenses")}>
              <Text   className='font-bold'  style={{color:"#e44816", fontSize:16,fontFamily:"Roboto-Medium",}}>View all</Text>
             </TouchableOpacity>
        </View>
         {/*Personal text END*/}
         {/*Personal Expenses start */}
        <View style={{flex:0,flexDirection:'column',marginTop:3,maxHeight:320}}>
          <ScrollView>
          {selfExpenses.length>0 && selfExpenses.map((exp)=><Expense deleteSelfExpense={deleteSelfExpense}  key={exp._id} expenseData={exp}/>)}
            {/* <Expense iname="fast-food-outline" name="Expense" date="20-05-2023" amount={199}/> */}
            {/* <Expense iname="medical-outline" name="Blood Test" date="10-05-2023" amount={499}/> */}
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

      {/* expense modal */}
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
                              <TextInput   placeholderTextColor={"#9ca3af"} placeholder='Enter the amount'
                                           value={amount} onChangeText={(txt)=>{setAmount(txt)}}
                                           keyboardType={'numeric'}
                                            style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View className=' border-solid border-2 w-full border-b-gray-400 mt-3'  style={{flexDirection:"row"}}>
                            <FontAwesome5
                                name='file-invoice'
                                size={30}
                                color="#9ca3af"
                                style={{marginRight: 5}}
                              />
                              <TextInput   placeholderTextColor={"#9ca3af"} placeholder='what was this expense for?'
                                           value={title} onChangeText={(txt)=>{setTitle(txt)}}
                                            style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

                          <View style={{flex:0,flexDirection:"row",width:"73%"}}>
                            <View>
                            <DropdownComponent category={category} setCategory={setCategory}/>
                            </View>

                              <View className='border-solid border-2 border-b-gray-400 mt-3 ml-3'  style={{flexDirection:"row"}}>
                                <MaterialIcons
                                    name='date-range'
                                    size={30}
                                    color="#9ca3af"
                                    style={{marginRight: 5}}
                                  />
                                  <View style={{paddingTop:5}}>
                                   <DatePicker date={date}
                                              setDate={setDate}/>
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
                      {error && 
                          // <View style={{borderColor:"red",borderRadius:7,borderWidth:4,padding:10}}>
                            <Text style={{color:"red",fontSize:18,textAlign:"center"}}>{error}</Text>
                          // </View>
                      }
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>

  )
}

export default Home