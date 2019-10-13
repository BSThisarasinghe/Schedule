import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, BackHandler, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { userFetch, scheduleFetch, setReload } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class TaskList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: true,
      scheduleList: []
    };
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  UNSAFE_componentWillMount() {
    this.props.userFetch();
    this.props.scheduleFetch();
    // this.props.setReload();
    // console.log("Hello");
    this.setState({ scheduleList: this.props.schedules });
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
    this.setState({ scheduleList: this.props.schedules });
  }

  onRowPress(schedules) {
    this.props.navigation.navigate('EditSchedule', { schedule: schedules });
  }

  renderListItem = ({ item }) => (
    <TouchableOpacity style={styles.linkStyle} key={item.uid} onPress={() => this.onRowPress(item)}>
      <View style={{ width: '50%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
        <Text style={styles.textReminderStyle}>{item.reminder}</Text>
      </View>
      <View style={{ width: '30%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
        <Text style={styles.textStyle}>{item.date}</Text>
      </View>
      <View style={{ width: '20%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
        <Text style={styles.textStyle}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.containerStyle}>
        <FlatList
          data={this.props.schedules}
          renderItem={this.renderListItem}
          keyExtractor={(item, index) => item.uid.toString()}
          extraData={this.state}
          scrollEnabled={this.state.scrollEnabled}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#EAEDEF',
    padding: 5,
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
    paddingBottom: 100,
    flex: 1
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  linkStyle: {
    width: '100%',
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textReminderStyle: {
    fontSize: 16,
    paddingLeft: 10,
    color: '#000',
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#000'
  }
}

const mapStateToProps = state => {
  // const username = _.map(state.username, (val, uid) => {
  //   return { ...val, uid };
  // });

  const schedules = _.map(state.schedules, (val, uid) => {
    return { ...val, uid };
  });

  return { schedules };
}

export default connect(mapStateToProps, { userFetch, scheduleFetch, setReload })(TaskList);