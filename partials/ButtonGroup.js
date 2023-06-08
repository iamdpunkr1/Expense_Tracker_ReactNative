import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const ButtonGroup = ({ buttons, onPress }) => {
  const [activeButton, setActiveButton] = useState(4); // Initialize state for active button

  const handlePress = (buttonIndex) => {
    setActiveButton(buttonIndex); // Set the active button to the index of the button that was pressed
    onPress(buttonIndex); // Call the onPress function passed as a prop, passing the index of the button that was pressed
  };

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, activeButton === index && styles.activeButton]}
          onPress={() => handlePress(index)}
        >
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 5,
    color:"red"
  },
  activeButton: {
    backgroundColor: '#d7261b',
    color:"#fff"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ButtonGroup;
