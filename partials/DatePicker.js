import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({date, setDate}) => {

  let today = new Date()
  let currDate = today.getDate() + '-' + parseInt(today.getMonth() + 1) + '-' +today.getFullYear() 

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
 
    const dt= new Date(date)
    const x= dt.toISOString().split('T')
    const x1=x[0].split('-')
    const actualDate=x1[2]+"-"+x1[1]+"-"+x1[0]
    setDate(actualDate)
    // console.warn("A date has been picked: ", actualDate);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity 
                             style={{
                                backgroundColor: 'black',
                               
                                
                              }}
                      onPress={showDatePicker} >
        <Text
         style={ {
            textAlign: 'center',
            color: '#9ca3af',
            fontSize:16
        }}>{date}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date("2023-06-13")}
      />
    </View>
  );
};

export default DatePicker;