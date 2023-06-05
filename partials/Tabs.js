import React, { useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';
import Expense from './Expense';
import Balance from './Balance';


const Tabs = ({groupExpenses, balance, deleteGroupExpense}) => {
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
            {groupExpenses.map((exp,idx)=>{ return (<Expense deleteSelfExpense={deleteGroupExpense} gid={idx}  key={idx} expenseData={exp}/>);})}
          </ScrollView>

    
      )}
      {activeTab === 1 && (
        <View style={{marginTop:10}}>
          {balance.map((data,index)=>{return (<Balance key={index} userName={data.memberName} amount={data.groupBalance}/>)})}
        </View>
      )}

    </View>
  );
};

export default Tabs;
