import React from 'react';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import LoginForm from './components/LoginForm';
import TaskList from './components/TaskList';
import OpenWindow from './components/OpenWindow';
import { Toggle, Notification } from './components/common';
import { emailChanged, passwordChanged, loginUser, logOutUser } from './actions';

const SecondNavigator = createDrawerNavigator({
    Profile: {
        screen: TaskList,
        navigationOptions: ({ navigation }) => ({
            title: 'Your Schedule'
        })
    }
}, {
    // drawerType: 'slide',
});

const MainNavigator = createStackNavigator({
    Open: { screen: OpenWindow },
    Home: {
        screen: LoginForm,
        navigationOptions: ({ navigation }) => ({
            title: 'Sign In',
            headerStyle: { backgroundColor: '#0680EC', height: 45 },
            headerLeft: null,
            headerRight: null
        })
    },
    Profile: {
        screen: SecondNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'Your Schedule',
            headerStyle: { backgroundColor: '#0680EC', height: 45 },
            headerLeft: <Toggle navigation={navigation} />,
            headerRight: <Notification logOutUser={logOutUser()} />
        })
    }
});


const Router = createAppContainer(MainNavigator);

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, logOutUser })(Router);