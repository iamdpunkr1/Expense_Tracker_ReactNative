import { PieChart } from "react-native-gifted-charts";
import { View, Text } from 'react-native'
import React from 'react'

const Donut = () => {
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
        <View>
          <View
            style={{
              
              marginHorizontal: 30,
              borderRadius: 10,
              paddingVertical: 50,
            //   backgroundColor: '#414141',
              justifyContent: 'center',
              alignItems: 'center',
            }}>


            {/*********************    Custom Header component      ********************/}
            {/* <Text
              style={{
                color: 'white',
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 12,
              }}>
              Quarterly Sales
            </Text> */}
            {/****************************************************************************/}


            <PieChart
            //   isAnimated={true}
              strokeColor="black"
              strokeWidth={4}
              donut
              data={[
                {value: 20, color: 'rgb(84,219,234)'},
                {value: 40, color: 'lightgreen'},
                {value: 20, color: 'orange'},
              ]}
              innerCircleColor="black"
              innerCircleBorderWidth={4}
              innerCircleBorderColor={'black'}
              showValuesAsLabels={true}
              showText
              textSize={18}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View style={{alignItems:"center"}}>
                    <Text style={{color: 'white', fontSize: 26}}>1000</Text>
                    <Text style={{color: 'white', fontSize: 15}}>Total</Text>
                  </View>
                );
              }}
            />


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
        </View>
    );
}

export default Donut
