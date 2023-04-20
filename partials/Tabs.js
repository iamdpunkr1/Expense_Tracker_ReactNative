import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <View style={{marginTop:10}}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => handleTabPress(0)}
          style={{
            backgroundColor: activeTab === 0 ? '#d7261b' : '#fff',
            padding: 10,
            flex: 1,
            alignItems: 'center',
            borderTopLeftRadius:7,
            borderBottomLeftRadius:7
          }}
        >
          <Text
           style={{ color: activeTab === 0 ? '#fff' : '#d7261b',}}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress(1)}
          style={{
            backgroundColor: activeTab === 1 ? '#d7261b' : '#fff',
            padding: 10,
            flex: 1,
            alignItems: 'center',
            borderTopRightRadius:5,
            borderBottomRightRadius:5
          }}
        >
          <Text style={{ color: activeTab === 1 ? '#fff' : '#d7261b'}}>Balance</Text>
        </TouchableOpacity>

      </View>

      {activeTab === 0 && (
        <View>
          <Text style={{color:'white'}}>Content for Tab 1</Text>
        </View>
      )}
      {activeTab === 1 && (
        <View>
          <Text style={{color:'white'}}>Content for Tab 2</Text>
        </View>
      )}

    </View>
  );
};

export default Tabs;
