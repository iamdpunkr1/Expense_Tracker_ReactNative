import { View, Text, TouchableOpacity,ScrollView, TextInput } from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Expense from '../partials/Expense'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useExpenseContext } from '../context/ExpenseContext'
import { useAuthContext } from '../hooks/useAuthContext'
const Expenses = ({navigation}) => {  
  const {user} = useAuthContext()
  const {selfExpenses,setSelfExpenses} = useExpenseContext()
  const [error,setError] = useState(null)

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
    return (
      <SafeAreaView style={{flex:1, backgroundColor:"#0d0f14"}}>
      <View style={{backgroundColor:"#0d0f14"}}>

              {/*Navigation*/}
              <View style={{backgroundColor:"#0d0f14",marginTop:5, shadowColor: '#9ca3af', paddingBottom:10,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity:  1,
                shadowRadius: 3,
                elevation: 4,}}>
                <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:"space-between"}}>
                <Text style={{color:"white",marginTop:12, fontSize:20, marginLeft:5,fontFamily:"Roboto-Medium",fontWeight:"bold"}}>All Expenses</Text>
                <TouchableOpacity
                  onPress={()=>{navigation.goBack()}}>
                         <Ionicons style={{marginTop:10}} name="return-up-back-sharp" size={35} color="#9ca3af"/>
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
                              <TextInput   placeholderTextColor={"#9ca3af"} placeholder='Type the expense title'  style={{paddingVertical:0, color:"white",minWidth:'75%'}}/>
                          </View>

          {/*Personal Expenses start */}
        <View style={{flex:0,flexDirection:'column',marginTop:30,maxHeight:600}}>
          <ScrollView>
          {selfExpenses.length>0 && selfExpenses.map((exp)=><Expense deleteSelfExpense={deleteSelfExpense} gid={exp._id}  key={exp._id} expenseData={exp}/>)}
          </ScrollView>
        </View>
         {/*Personal Expenses END */}

          </View>

      </SafeAreaView>
  );
}

export default Expenses