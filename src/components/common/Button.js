import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
            <Text style={[styles.buttonTextStyle, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}


const styles = {
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        // marginLeft: 20,
        // marginRight: 20,
        borderRadius: 0
    }
}

export { Button };