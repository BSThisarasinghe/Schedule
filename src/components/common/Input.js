import React from 'react';
import { View, TextInput, Text } from 'react-native';

const Input = ({ label, value, onChangeText, secureTextEntry, placeholder, placeholderTextColor, labelStyle, style }) => {
    return (
        <View style={styles.containerStyle}>
            <Text style={[styles.labelStyle,  labelStyle ]}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.inputStyle, style]}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        color: '#000'
    },
    containerStyle: {
        heght: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(82, 109, 127, 1)'
    }
}

export { Input };