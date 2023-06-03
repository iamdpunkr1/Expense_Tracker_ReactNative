import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React, { useState, useEffect } from 'react'

const Share = ({ name, amount, shares, setShare, id, count }) => {

  // total shares of all members
  const [total, setTotal] = useState(0);

  // adding total shares of the members using reduce & useEffect
  useEffect(() => {
    const sum = shares.reduce((acc, { share }) => acc + share, 0);
    setTotal(sum);
  }, [shares]);

  const increment = () => {
    const newData = shares.map((item) => {
      if (item._id === id) {
        return { ...item, share: item.share + 1 };
      }
      return item;
    });
    setShare(newData);
  };

  const decrement = () => {
    setShare(shares=>{
      const updatedData = shares.map((item) => {
        if (item._id === id && item.share > 0) {
            return { ...item, share: item.share - 1 };
          
        }
        return item;
      });
  
      // Check if all shares are zero
      const areAllSharesZero = updatedData.every(item => item.share === 0);
     
         // If all shares are zero, reset the share of the first element to 1
         if (areAllSharesZero) {
          updatedData[0].share = 1;
        }
  
        return updatedData;
    })
  
  };

  return (
    <View style={{
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: "space-between",
      borderColor: "#cbc4c5",
      borderBottomWidth: 2,
      borderRadius: 5,padding: 10
    }}>
      <Text style={{ color: "white" }}>{name}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={decrement}>
          <AntDesign name='minussquare' size={21} color="#d3d392" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600", marginRight: 10 }}>{count}</Text>
        <TouchableOpacity onPress={increment}>
          <AntDesign name='plussquare' size={21} color="#ff9356" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ color: "#b5807f", fontSize: 16, fontFamily: "Roboto-Medium", marginRight: 10 }}>
          <FontAwesome5 name='rupee-sign' size={16} color="#b5807f" />
          {((amount / total) * count)%1===0?((amount / total) * count).toFixed(0):((amount / total) * count).toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export default Share;