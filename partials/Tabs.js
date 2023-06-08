import React, { useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';
import Expense from './Expense';
import Balance from './Balance';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Tabs = ({groupExpenses, balance, deleteGroupExpense, showEdit, totalAmount}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

   
  return (
    <View style={{marginTop:10,}}>
      <View style={{ flexDirection: 'row',borderColor:"white",backgroundColor:"white",borderWidth:7,borderRadius:7 }}>
        <TouchableOpacity
          onPress={() => handleTabPress(0)}
          style={{
            backgroundColor: activeTab === 0 ? '#d7261b' : '#fff',
            padding: 10,
            flex: 1,
            alignItems: 'center',
            borderRadius:7
          }}
        >
          <Text
           style={{ color: activeTab === 0 ? '#fff' : '#d7261b',fontWeight:"bold"}}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress(1)}
          style={{
            backgroundColor: activeTab === 1 ? '#d7261b' : '#fff',
            padding: 10,
            flex: 1,
            alignItems: 'center',
            borderRadius:7
          }}
        >
          <Text style={{ color: activeTab === 1 ? '#fff' : '#d7261b',fontWeight:"bold"}}>Balance</Text>
        </TouchableOpacity>

      </View>

      {activeTab === 0 && (
    

          <ScrollView  style={{marginTop:10}}>
            { groupExpenses && groupExpenses.map((exp,idx)=>{ return (<Expense deleteSelfExpense={deleteGroupExpense} gid={idx}
                key={idx} expenseData={exp} isGroup={true} showEdit={showEdit}/>);})}
          </ScrollView>

    
      )}
      {activeTab === 1 && (
        <View style={{marginTop:10}}>

          {balance.map((data,index)=> {

            return (<Balance key={index} userName={data.memberName} amount={data.groupBalance}/>)
          })}

                <View style={{flex:0,flexDirection:'row',justifyContent:'space-between',backgroundColor:"#9ca3af",borderColor:"#595b62",borderRadius:5,borderStyle:'solid',borderTopWidth:5,padding:15, marginTop:4}}>
                    <View style={{flex:0,flexDirection:'row',marginLeft:7}}>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:"bold" ,color:"black", fontSize:18,fontFamily:"Roboto-Medium",}}>Total</Text> 
                        </View>
                    </View>
            
                    <Text   style={{fontWeight:"bold" ,color:"black", fontSize:18,fontFamily:"Roboto-Medium", marginRight:10}}>
                      <FontAwesome5 name='rupee-sign' size={18} color="black"/> {totalAmount%1===0?totalAmount.toFixed(0):totalAmount.toFixed(2)}
                    </Text> 
                </View>
        </View>
      )}

    </View>
  );
};

export default Tabs;
