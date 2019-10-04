import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { StackNavigator } from 'react-navigation';
import { Spinner } from './Spinner';

class Notification extends Component {
    state = {
        user_name: 'label',
        loading: true,
        level: ''
    };


    onSelectOpt(idx, value) {
        this.setState({ level: value });
        if (value === "Logout") {
            { this.goBack() }
        }
    }

    goBack() {
        this.props.logOutUser();
    }

    showLogout() {
        return (
            <ModalDropdown options={[this.state.user_name, 'Logout']} onSelect={(idx, value) => this.onSelectOpt(idx, value)} style={{ width: '100%', height: 30, justifyContent: 'center', paddingLeft: 20 }} dropdownStyle={{ width: 100, height: 82, paddingBottom: 0 }} dropdownTextStyle={{ color: '#000', fontSize: 15 }} dropdownTextHighlightStyle={{ fontWeight: 'bold' }} >
                <View style={{ height: 30, width: 60, alignItems: 'center', paddingRight: 20 }}>
                    <Image
                        source={require('../pics/logout.png')}
                        style={styles.downStyle}
                    />
                </View>
            </ModalDropdown>
        );
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                <View style={{ height: 30, width: 60, backgroundColor: 'transparent' }}>
                    {this.showLogout()}
                </View>
            </View>
        )
    }
}


const styles = {
    imageStyle: {
        width: 25,
        height: 25
    },
    buttonStyle: {
        marginLeft: 5,
        marginRight: 7
    },
    spinnerStyle: {
        alignSelf: 'stretch',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60,
        paddingTop: 10,
        paddingBottom: 10,
        height: 100
    },
    downStyle: {
        width: 25,
        height: 25
    }
}

export { Notification };