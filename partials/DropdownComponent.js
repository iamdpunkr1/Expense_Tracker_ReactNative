import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const data = [
  { label: 'Education', value: 'education' },
  { label: 'Food', value: 'food' },
  { label: 'Medical', value: 'medical' },
  { label: 'Rent', value: 'rent' },
  { label: 'Social Event', value: 'socialEvent' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Miscelleneous', value: 'miscelleneous' },
  
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  return (
    <View style={styles.container}>

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#9ca3af' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={200}
        containerStyle={{backgroundColor:"#0d0f14"}}
        itemTextStyle={{color:"#9ca3af"}}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Category' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}

      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    
  },
  dropdown: {
    height: 40,
    borderBottomColor: '#9ca3af',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    minWidth:"50%",
    marginRight:0,
    marginTop:10,
    backgroundColor:"#0d0f14" 
  },
  icon: {
    marginRight: 5,

  },

  placeholderStyle: {
    fontSize: 16,
    backgroundColor:"#0d0f14",
    color:"#9ca3af"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"#9ca3af",
    backgroundColor:"#0d0f14"
  },


});