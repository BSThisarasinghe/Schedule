import React, { Component } from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
      <View style={[styles.containerStyle, props.cardSectionStyle, props.style]}>
          {props.children}
      </View>
    );  
};

const styles = {
    containerStyle: {
        marginTop: 20,
        borderBottomWidth: 0,
        backgroundColor: 'rgba(137, 157, 170, 1)',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 0,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    }
};


export { CardSection };