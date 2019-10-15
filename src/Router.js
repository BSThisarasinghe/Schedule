import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskList from './components/TaskList';
import OpenWindow from './components/OpenWindow';
import AddSchedule from './components/AddSchedule';
import EditSchedule from './components/EditSchedule';
import { Toggle, Notification } from './components/common';
import { userFetch, passwordChanged, loginUser, logOutUser } from './actions';

const ThirdNavigator = createBottomTabNavigator({
    Login: LoginForm,
    Register: RegisterForm
}, {
    tabBarOptions: {
        activeBackgroundColor: '#fff',
        activeTintColor: 'rgba(82, 109, 127, 1)',
        inactiveBackgroundColor: 'rgba(82, 109, 127, 1)',
        inactiveTintColor: '#fff',
        labelStyle: {
            fontSize: 18,
            marginBottom: 10
        }
    }
});

const SecondNavigator = createDrawerNavigator({
    Profile: {
        screen: TaskList,
        navigationOptions: ({ navigation }) => ({
            title: 'Your Schedule'
        })
    },
    AddSchedule: {
        screen: AddSchedule,
        navigationOptions: ({ navigation }) => ({
            title: 'Add Schedule'
        })
    }
}, {
    // drawerType: 'slide',
});

const MainNavigator = createStackNavigator({
    Open: { screen: OpenWindow },
    Home: {
        screen: ThirdNavigator,
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: 'transparent', height: 0 },
            headerLeft: null,
            headerRight: null
        })
    },
    Profile: {
        screen: SecondNavigator,
        navigationOptions: ({ navigation, username, loading }) => ({
            title: 'Your Schedule',
            headerStyle: { backgroundColor: 'rgba(82, 109, 127, 1)', height: 45 },
            headerLeft: <Toggle navigation={navigation} />,
            headerRight: <Notification logOutUser={logOutUser()} username={username} loading={loading} />
        })
    },
    EditSchedule: {
        screen: EditSchedule,
        navigationOptions: ({ navigation }) => ({
            title: 'Edit Schedule',
            headerStyle: { backgroundColor: 'rgba(82, 109, 127, 1)', height: 45 },
        })
    }
});


const Router = createAppContainer(MainNavigator);

const mapStateToProps = state => {
    const loading = state.username.loading;
    const username = _.map(state.username.user_details, (val, uid) => {
        return { ...val, uid };
    });

    return { loading, username };
}

export default connect(mapStateToProps, { userFetch, passwordChanged, loginUser, logOutUser })(Router);