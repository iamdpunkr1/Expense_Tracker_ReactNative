import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React,{useState} from 'react'

const Share = ({name,amount}) => {
    const [count, setCount] = useState(1);

    const increment = () => {
      setCount(count + 1);
    };
  
    const decrement = () => {
        if(count>0){
        setCount(count - 1);
        }
    };
  return (
    <View style={{marginTop:10,flexDirection: 'row',justifyContent:"space-between",borderColor:"#cbc4c5",borderBottomWidth:2,borderRadius:5,padding:10}}>
    <Text style={{color:"white"}}>{name}</Text>
    <View style={{flexDirection:"row"}}>
      <TouchableOpacity style={{marginRight:10}} onPress={decrement}>
        <AntDesign name='minussquare' size={21} color="#d3d392"/>
      </TouchableOpacity>
      <Text style={{color:"white",fontSize:16,fontWeight:"600",marginRight:10}}>{count}</Text>
      <TouchableOpacity  onPress={increment}>
        <AntDesign name='plussquare' size={21} color="#ff9356"/>
      </TouchableOpacity>
    </View>
    <View>
    <Text   style={{color:"#b5807f", fontSize:16,fontFamily:"Roboto-Medium", marginRight:10}}>
      <FontAwesome5 name='rupee-sign' size={16} color="#b5807f"/>{(amount/2)*count}
    </Text> 
    </View>
  </View>
  )
}

export default Share