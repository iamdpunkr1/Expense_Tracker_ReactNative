import { PieChart } from "react-native-gifted-charts";
import { View, Text } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React from 'react'

const Donut = ({values, categories, spent}) => {
    
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
              data={values && values}
              innerCircleColor="black"
              innerCircleBorderWidth={4}
              innerCircleBorderColor={'black'}
              // showValuesAsLabels={true}
              // showText
              textSize={18}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View style={{alignItems:"center"}}>
                    <FontAwesome5  name='rupee-sign' size={16} color="white"/>
                    <Text style={{color: 'white', fontSize: 26}}>{spent}</Text>
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
          {categories && categories.map((item,idx)=>{  
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
            </View>
            {/****************************************************************************/}

            
          </View>
        </View>
    );
}

export default Donut
