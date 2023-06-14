import { View, Text, Image, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import {  PieChart } from "react-native-gifted-charts";
import ButtonGroup from '../partials/ButtonGroup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenseContext } from '../context/ExpenseContext';
import { useAuthContext } from '../hooks/useAuthContext';
const Analysis = ({navigation}) => {

  //getting data from context
  const {groups, selfExpenses, toggle}=useExpenseContext()
  const {user} = useAuthContext()

  const [spent,setSpent] = useState(0)
  const [selectedButton, setSelectedButton] = useState(null); // Initialize state for selected button
  const [categories, setCategories] =  useState(null)
  const [values, setValues] =  useState(null)
  
  //fetch expenses according to no of days
  const fetchExpenses=(date)=>{
    function compareDates(date1, date2) {
      const [day1, month1, year1] = date1.split('-').map(Number);
      const [day2, month2, year2] = date2.split('-').map(Number);
    
      const jsDate1 = new Date(year1, month1 - 1, day1);
      const jsDate2 = new Date(year2, month2 - 1, day2);
    
      if (jsDate1 >= jsDate2) {
        return true
      }  else {
        return false
      }
    }
    

    
    
    const categoryTotals = {};
    const groupCategoryTotal = {};
    selfExpenses.forEach(exp=> {
      if(compareDates(exp.date, date)){
        if (categoryTotals[exp.category]) {
          categoryTotals[exp.category] += exp.amount;
        } else {
          categoryTotals[exp.category] = exp.amount;
        }
      }

    })

    // console.log(date,categoryTotals)

    groups.forEach(grp=>{
                          grp.groupExpenses.forEach(exp=>{
                            if(compareDates(exp.date, date)){
                              exp.shares.forEach(s=>{
                                if(s.memberEmail===user.user.email){
                                            if (groupCategoryTotal[exp.category]) {
                                                groupCategoryTotal[exp.category] += s.balance;
                                                } else {
                                                  groupCategoryTotal[exp.category] = s.balance;
                                                }
                                }
                              })
                          }
                        })
                        })

    // console.log("group: ",groupCategoryTotal)

    const result = {};

    // Add values from categoryTotals to result
    for (const key in categoryTotals) {
      if (result[key]) {
        result[key] += categoryTotals[key];
      } else {
        result[key] = categoryTotals[key];
      }
    }

    // Add values from groupCategoryTotal to result
    for (const key in groupCategoryTotal) {
      if (result[key]) {
        result[key] += groupCategoryTotal[key];
      } else {
        result[key] = groupCategoryTotal[key];
      }
    }

    // console.log(result);

    //generate random color
    function generateRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    
    

    // Calculate the total sum of all amounts
    const total = Object.values(result).reduce((acc, cur) => acc + cur, 0);

    // Calculate the percentage for each category and format the output
    const formattedResult = Object.entries(result).map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / total) * 100).toFixed(2),
      color: generateRandomColor()
    }));

    // console.log(formattedResult);
    setCategories(formattedResult)
    setValues(formattedResult.map(item=>{return {value:parseFloat(item.percentage),color:item.color}}))
    // console.log(values)
    setSpent(total)
  }
  
  
  
  
  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const formattedToday = formatDate(today);
    const formattedOneWeekAgo = formatDate(oneWeekAgo);
    const formattedOneMonthAgo = formatDate(oneMonthAgo);
    const formattedOneYearAgo = formatDate(oneYearAgo);

    switch(buttonIndex){
      case 0: fetchExpenses(formattedToday)
              break;
      case 1: fetchExpenses(formattedOneWeekAgo)
              break;
      case 2: fetchExpenses(formattedOneMonthAgo)
              break;
      case 3: fetchExpenses(formattedOneYearAgo)
              break;
      case 4: fetchExpenses('01-01-1999')
              break;
      default: console.log("default selected")
              break;
    }
  }

  
  useEffect(()=>{
    console.log("useEffect Analysis")
    if(user){
       //total expense amount
        const categoryTotals = {};
        const groupCategoryTotal = {};
        selfExpenses.forEach(exp=> {
          
          if (categoryTotals[exp.category]) {
            categoryTotals[exp.category] += exp.amount;
          } else {
            categoryTotals[exp.category] = exp.amount;
          }
        })

        // console.log(categoryTotals)

        groups.forEach(grp=>{
                              grp.groupExpenses.forEach(exp=>{

                                  exp.shares.forEach(s=>{
                                    if(s.memberEmail===user.user.email){
                                                if (groupCategoryTotal[exp.category]) {
                                                    groupCategoryTotal[exp.category] += s.balance;
                                                    } else {
                                                      groupCategoryTotal[exp.category] = s.balance;
                                                    }
                                    }
                                  })
                              })
                            })

        // console.log("group: ",groupCategoryTotal)

        const result = {};

        // Add values from categoryTotals to result
        for (const key in categoryTotals) {
          if (result[key]) {
            result[key] += categoryTotals[key];
          } else {
            result[key] = categoryTotals[key];
          }
        }

        // Add values from groupCategoryTotal to result
        for (const key in groupCategoryTotal) {
          if (result[key]) {
            result[key] += groupCategoryTotal[key];
          } else {
            result[key] = groupCategoryTotal[key];
          }
        }

        // console.log(result);

        //generate random color
        function generateRandomColor() {
          const letters = "0123456789ABCDEF";
          let color = "#";
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        
        

        // Calculate the total sum of all amounts
        const total = Object.values(result).reduce((acc, cur) => acc + cur, 0);

        // Calculate the percentage for each category and format the output
        const formattedResult = Object.entries(result).map(([category, amount]) => ({
          category,
          amount,
          percentage: ((amount / total) * 100).toFixed(2),
          color: generateRandomColor()
        }));

        // console.log(formattedResult);
        setCategories(formattedResult)
        setValues(formattedResult.map(item=>{return {value:parseFloat(item.percentage),color:item.color}}))
        // console.log(values)
        setSpent(total)
      
    }
  },[user,groups,selfExpenses])

  // const renderLegend = (category, cent, color) => {
  //   return (
  //     <View style={{flexDirection: 'row',justifyContent:'space-between', marginBottom: 12,paddingHorizontal:10,borderColor:"#9ca3af",borderRadius:0,borderStyle:'solid',borderBottomWidth:1,paddingBottom:10}}>
  //       <View style={{flexDirection: 'row'}}>
  //         <View
  //           style={{
  //             height: 18,
  //             width: 18,
  //             marginRight: 10,
  //             borderRadius: 4,
  //             backgroundColor: color || 'white',
  //           }}
  //         />
  //         <Text style={{color: 'white', fontSize: 16}}>{category || ''}</Text>
  //       </View>
  //       <View>
  //         <Text style={{color: 'white', fontSize: 16}}>{cent || ''}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
  <SafeAreaView style={{flex:1,backgroundColor:"#0d0f14"}}>
            {/*Navigation */}
            <View style={{paddingHorizontal:20,backgroundColor:"#0d0f14", shadowColor: '#9ca3af',zIndex:999,paddingBottom:8,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity:  0.3,
              shadowRadius: 3,
              elevation: 2,}}>
            <View style={{ flexDirection:'row',justifyContent:"space-between"}}>

            <Text style={{color:"white",marginTop:12, fontSize:20,fontFamily:"Roboto-Medium",fontWeight:"bold"}}>Spend Analysis</Text>
            <TouchableOpacity
                  onPress={()=>{navigation.openDrawer()}}>
                        <MaterialIcons
                            style={{marginTop:10}}
                            name='menu'
                            size={35}
                            color="#9ca3af"  />
            </TouchableOpacity>          
        </View>
        </View>
        {/*Navigation */} 
      <View style={{paddingHorizontal:20}}>
      <View
        style={{
          borderRadius: 10,
          paddingVertical: 50,
          backgroundColor: '#0d0f14',
          justifyContent: 'center',
        }}>



      <View style={{paddingLeft:45}}>
     {values && 
      <PieChart
                
                strokeColor="black"
                strokeWidth={4}
                donut
                data={values}
                innerCircleColor="#0d0f14"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={'black'}
                // showValuesAsLabels={true}
                // showText
                textSize={12}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <FontAwesome5  name='rupee-sign' size={16} color="white"/>
                      <Text style={{color: 'white', fontSize: 20}}> {spent}</Text>
                      <Text style={{color: 'white', fontSize: 14 }}>Total</Text>
                    </View>
                  );
                }}
              />}
      </View>



        {/*********************    Custom Legend component      ********************/}
       {categories &&
         <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {categories.map((item,idx)=>{  
          return(
            <View key={idx} style={{flexDirection: 'row',justifyContent:'space-between', marginBottom: 12,paddingHorizontal:10,borderColor:"#9ca3af",borderRadius:0,borderStyle:'solid',borderBottomWidth:1,paddingBottom:10}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 18,
                  width: 18,
                  marginRight: 10,
                  borderRadius: 4,
                  backgroundColor: item.color || 'white',
                }}
              />
              <Text style={{color: 'white', fontSize: 16}}>{item.category || ''}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
            <FontAwesome5 style={{paddingTop:4,marginRight:3}} name='rupee-sign' size={16} color="white"/>
              <Text style={{color: 'white', fontSize: 16}}>{ `${item.amount} ( ${item.percentage}% )` || ''}</Text>
            </View>
          </View>
          )
          })}  
          {/* {}
          {renderLegend('Shopping','100(10%)', 'lightgreen')}
          {renderLegend('Housing','100(10%)', 'orange')}
          {renderLegend('Medical','100(10%)', 'crimson')}
          {renderLegend('Miscellaneous','100(10%)', 'teal')}
          {renderLegend('Social Event','100(10%)', 'green')} */}
          
        </View>}
        {/****************************************************************************/}

        
      </View>
      <ButtonGroup buttons={['Today', 'Week', 'Month','Year','All']} onPress={handleButtonPress} />
      {/* {selectedButton !== null && (
        <Text style={{color:"white"}}>You selected button {selectedButton + 1}</Text>
      )} */}
    </View>
    </SafeAreaView>
);

}

export default Analysis