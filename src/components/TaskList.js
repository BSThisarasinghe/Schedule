import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { userFetch } from '../actions';

class TaskList extends Component {

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  UNSAFE_componentWillMount() {
    this.props.userFetch();
    // console.log(this.props.username.name);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps.username);
    if (firebase.auth().currentUser == null) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    console.log(this.props);
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
    const username = _.map(state.username, (val, uid) => {
      return { ...val, uid };
    });

    return { username };
}

export default connect(mapStateToProps, { userFetch })(TaskList);