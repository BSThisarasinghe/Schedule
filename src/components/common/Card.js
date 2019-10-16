import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import CardSection from './CardSection';


const Card = (props) => {
  return (
    <ScrollView style={[styles.containerStyle, props.style]} keyboardShouldPersistTaps='always'>
      {props.children}
    </ScrollView>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(82, 109, 127, 1)',
    flex: 1,
    borderRadius: 2,
    //borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10
  }
};


export { Card };