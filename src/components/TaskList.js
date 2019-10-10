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

  onRowPress(schedules){
    this.props.navigation.navigate('EditSchedule', { schedule: schedules });
  }

  renderListItem = ({ item }) => (
    <TouchableOpacity style={styles.linkStyle} key={item.uid} onPress={() => this.onRowPress(item)}>
      <Card>
        <CardSection>
          <Text>
            {item.reminder}
          </Text>
        </CardSection>
        <CardSection>
          <Text>
            {item.date}
          </Text>
        </CardSection>
        <CardSection>
          <Text>
            {item.time}
          </Text>
        </CardSection>
      </Card>
    </TouchableOpacity>
  )

  render() {
    // console.log(this.props);
    return (
      <FlatList
        data={this.props.schedules}
        renderItem={this.renderListItem}
        keyExtractor={(item, index) => item.uid.toString()}
        extraData={this.state}
        scrollEnabled={this.state.scrollEnabled}
      />
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

  const schedules = _.map(state.schedules, (val, uid) => {
    return { ...val, uid };
  });

  return { username, schedules };
}

export default connect(mapStateToProps, { userFetch, scheduleFetch, setReload })(TaskList);