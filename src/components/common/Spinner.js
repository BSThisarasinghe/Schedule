import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    )
}

const styles = {
    spinnerStyle: {
        flex: 1,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60
    }
}

export { Spinner };