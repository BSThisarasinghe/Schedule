import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { emailChanged, passwordChanged, loginUser, logOutUser } from '../actions';

class TaskList extends Component {

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  UNSAFE_componentWillMount() {
    // this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser == null) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (
      <View>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
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

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, logOutUser })(TaskList);