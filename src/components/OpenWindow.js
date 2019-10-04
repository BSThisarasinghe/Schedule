import React, { Component } from 'react';
import { Alert, View, Text, FlatList, YellowBox } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { CirclesLoader, PulseLoader, TextLoader, NineCubesLoader } from 'react-native-indicator';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class OpenWindow extends Component {

    static navigationOptions =
        {
            title: '',
            headerStyle: { backgroundColor: 'transparent', height: 0 }
        };

    UNSAFE_componentWillMount() {
        // const {  user } = this.props;
        const { navigate } = this.props.navigation;

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // console.log(user);
                navigate('Profile');
            } else {
                // console.log(user);
                navigate('Home');
            }
        });
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NineCubesLoader color='#0680EC' size={40} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(OpenWindow);
