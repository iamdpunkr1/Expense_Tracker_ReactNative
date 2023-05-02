import { View, Text, Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {  PieChart } from "react-native-gifted-charts";
import ButtonGroup from '../partials/ButtonGroup';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
const Analysis = ({navigation}) => {
  const [selectedButton, setSelectedButton] = useState(null); // Initialize state for selected button

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex); // Set the selected button to the index of the button that was pressed
  };

  const renderLegend = (category,cent, color) => {
    return (
      <View style={{flexDirection: 'row',justifyContent:'space-between', marginBottom: 12,paddingHorizontal:10,borderColor:"#9ca3af",borderRadius:0,borderStyle:'solid',borderBottomWidth:1,paddingBottom:10}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 18,
              width: 18,
              marginRight: 10,
              borderRadius: 4,
              backgroundColor: color || 'white',
            }}
          />
          <Text style={{color: 'white', fontSize: 16}}>{category || ''}</Text>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 16}}>{cent || ''}</Text>
        </View>

      </View>
    );
  };

  return (
    <View style={{flex:1,paddingHorizontal: 30,backgroundColor:"#0d0f14"}}>
            {/*Hi Dipankar! start */}
            <View style={{marginTop:5, flexDirection:'row'}}>

            <Text style={{color:"white",marginTop:12, fontSize:20, marginLeft:5,fontFamily:"Roboto-Medium",marginRight:180,fontWeight:"bold"}}>Spend Analysis</Text>
            <TouchableOpacity
                  onPress={()=>{navigation.openDrawer()}}>
                        <SimpleLineIcons
                            style={{marginTop:10}}
                            name='menu'
                            size={26}
                            color="#9ca3af"  />
            </TouchableOpacity>          
        </View>
        {/*Hi Dipankar! End */} 
      <View
        style={{
          
          borderRadius: 10,
          paddingVertical: 50,
          backgroundColor: '#0d0f14',
          justifyContent: 'center',
          
        }}>



<View style={{paddingLeft:45}}>

<PieChart
          
          strokeColor="black"
          strokeWidth={4}
          donut
          data={[
            {value: 30, color: 'rgb(84,219,234)'},
            {value: 40, color: 'lightgreen'},
            {value: 20, color: 'orange'},
            {value: 10, color: 'crimson'},
            {value: 45, color: 'teal'},
            {value: 20, color: 'green'},
          ]}
          innerCircleColor="#0d0f14"
          innerCircleBorderWidth={4}
          innerCircleBorderColor={'black'}
          showValuesAsLabels={true}
          showText
          textSize={12}
          showTextBackground={true}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20}}>4,563</Text>
                <Text style={{color: 'white', fontSize: 14 }}>Total</Text>
              </View>
            );
          }}
        />
</View>



        {/*********************    Custom Legend component      ********************/}
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {renderLegend('Education','100(10%)', 'rgb(84,219,234)')}
          {renderLegend('Shopping','100(10%)', 'lightgreen')}
          {renderLegend('Housing','100(10%)', 'orange')}
          {renderLegend('Medical','100(10%)', 'crimson')}
          {renderLegend('Miscellaneous','100(10%)', 'teal')}
          {renderLegend('Social Event','100(10%)', 'green')}
          
        </View>
        {/****************************************************************************/}

        
      </View>
      <ButtonGroup buttons={['Today', 'Week', 'Month','Year','All']} onPress={handleButtonPress} />
      {selectedButton !== null && (
        <Text style={{color:"white"}}>You selected button {selectedButton + 1}</Text>
      )}
    </View>
);

}

export default Analysis